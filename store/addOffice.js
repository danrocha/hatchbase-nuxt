import psl from 'psl'

export const state = () => ({
  location: null,
  office: null,
  fetchedLocations: [],
  fetchedDetails: null,
  loading: false
})

export const mutations = {
  SET_LOCATION(state, location) {
    state.location = location
  },
  SET_FETCHED_LOCATIONS(state, locations) {
    state.fetchedLocations = locations
  },
  SET_FETCHED_DETAILS(state, details) {
    state.fetchedDetails = details
  },
  SET_OFFICE(state, office) {
    state.office = office
  },
  RESET_ALL(state) {
    state.office = null
    state.location = null
    state.loading = false
    state.fetchedLocations = []
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}
export const actions = {
  setLocation({ commit }, location) {
    const finalLocation = { ...location, ...getAddressObject(location) }
    return commit('SET_LOCATION', finalLocation)
  },
  setFetchedLocations({ commit }, locations) {
    return commit('SET_FETCHED_LOCATIONS', locations)
  },
  setFetchedDetails({ commit, rootState }, details) {
    return commit(
      'SET_FETCHED_DETAILS',
      officeDetails(details, rootState.card.currentCard)
    )
  },
  setOffice({ commit }, office) {
    return commit('SET_OFFICE', office)
  },
  resetAll({ commit }) {
    return commit('RESET_ALL')
  },
  async fetchPlaceDetails({ commit, dispatch }, placeId) {
    commit('SET_LOADING', true)
    const url = `http://localhost:4000/get-place-details?place_id=${placeId}`
    try {
      const results = await this.$axios.$get(url)
      if (results.status === 'OK') {
        dispatch('setFetchedDetails', results.result)
      } else {
        throw new Error('Problems fetching place details', results.status)
      }
    } catch (e) {
      console.error(e)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchAddresses({ commit, dispatch, rootState }) {
    commit('SET_LOADING', true)
    const card = rootState.card.currentCard
    let url = `http://localhost:4000/get-address?address=${card.officeName}`
    if (card.city) url += ` ${card.city}`
    if (card.country) url += `&country=${card.country}`

    try {
      const results = await this.$axios.$get(url)
      if (results.status === 'OK') {
        dispatch('setFetchedLocations', results.results)
      } else {
        throw new Error('Could not get any addresses:', results.status)
      }
    } catch (e) {
      console.error(e)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

function officeDetails(details, card) {
  // eslint-disable-next-line camelcase
  const { name, website, international_phone_number } = details
  const officeDetails = { name, website, international_phone_number }
  if (website) {
    officeDetails.domain = getDomain(website)
  }
  officeDetails.logoUrl = setLogoUrl(card, officeDetails.domain)
  return officeDetails
}

function setLogoUrl(card, domain = null) {
  if (card.companyLogo) return card.companyLogo
  if (domain) return `https://logo.clearbit.com/${domain}`
  return randomLogo(card.officeName)
}

function getDomain(url) {
  const sourceString = url
    .replace('http://', '')
    .replace('https://', '')
    .split(/[/?#]/)[0]
  const domain = psl.parse(sourceString).domain
  return domain
}

function randomLogo(officeName) {
  return `https://avatars.dicebear.com/v2/initials/${officeName}.svg`
}

function getAddressObject(location) {
  const ShouldBeComponent = {
    street_number: ['street_number'],
    postal_code: ['postal_code'],
    route: ['street_address', 'route'],
    region: [
      'administrative_area_level_1',
      'administrative_area_level_2',
      'administrative_area_level_3',
      'administrative_area_level_4',
      'administrative_area_level_5'
    ],
    city: [
      'locality',
      'sublocality',
      'sublocality_level_1',
      'sublocality_level_2',
      'sublocality_level_3',
      'sublocality_level_4',
      'postal_town'
    ],
    country: ['country']
  }

  const address = {
    street_number: '',
    postal_code: '',
    route: '',
    region: '',
    city: '',
    country: ''
  }
  location.address_components.forEach((component) => {
    for (const shouldBe in ShouldBeComponent) {
      if (ShouldBeComponent[shouldBe].includes(component.types[0])) {
        if (shouldBe === 'country') {
          address[shouldBe] = component.short_name
        } else {
          address[shouldBe] = component.long_name
        }
      }
    }
  })
  return address
}
