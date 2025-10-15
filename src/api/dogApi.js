// src/api/dogApi.js

const BASE = 'https://api.thedogapi.com/v1'
const KEY = import.meta.env.VITE_DOG_API_KEY
const headers = KEY ? { 'x-api-key': KEY } : {}

/** Generic fetch helper with ?params */
async function api(path, { params = {}, opts = {} } = {}) {
  const url = new URL(BASE + path)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
  })
  const res = await fetch(url, { headers, ...opts })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`DogAPI ${res.status}: ${text || url.toString()}`)
  }
  return res.json()
}

/**
 * Home grid — slike sa uvezanim breed info.
 * @param {number} page
 * @param {number} limit
 */
export function fetchBreedImages(page = 0, limit = 24) {
  return api('/images/search', {
    params: {
      has_breeds: 1,
      order: 'ASC',
      size: 'med',
      page,
      limit
    }
  })
}

/** Jedna slika po ID-u (koristi se za BreedDetails) */
export function fetchImageById(imageId) {
  if (!imageId) return Promise.reject(new Error('imageId is required'))
  return api(`/images/${imageId}`)
}

/** Random jedna slika (sa breed info ako postoji) — koristi se u FunFact */
export function fetchRandomBreedImage() {
  return api('/images/search', {
    params: { has_breeds: 1, order: 'RANDOM', size: 'med', limit: 1 }
  })
}

/** Lista rasa — koristi Compare i Admin pretrage */
export function fetchBreeds() {
  return api('/breeds')
}

/**
 * Učitaj slike za više rasa odjednom (npr. “Istaknute rase”).
 * @param {number[]} breedIds
 * @param {number} limitPerBreed
 * @returns {Promise<Array>}
 */
export async function searchImagesByBreedIds(breedIds = [], limitPerBreed = 1) {
  if (!Array.isArray(breedIds) || breedIds.length === 0) return []
  // TheDogAPI omogućava comma-separated breed_ids u /images/search
  const data = await api('/images/search', {
    params: {
      breed_ids: breedIds.join(','),
      has_breeds: 1,
      size: 'med',
      order: 'ASC',
      limit: limitPerBreed
    }
  })
  return data
}
