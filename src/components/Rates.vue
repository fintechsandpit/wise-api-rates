<template>
  <div class="rates__container">
    <div class="rates-header__row">
        <div class="rates-header__logo-container">
            <img class="rates-header__logo" src="../assets/wise-logo.png">
        </div>
        <div class="rates-header__api-key">
            <label for="apiKey">API Key</label>
            <input type="password" ref="apiKey" id="apiKey" @change="setApiKey">
        </div>
    </div>
    <div class="rates-table-header__container">
        <div class="rates-table-header__title">
            <h1>Rates</h1>
        </div>
        <div class="rates-table-header__actions">
            <VueLoadingButton
                @click.native="getRates"
                :loading="ratesLoading"
            >Refresh</VueLoadingButton>
        </div>
    </div>
    <div class="rates-table__container">
        <vue-good-table
            :columns="ratesColumns"
            :rows="ratesRows"/>
    </div>
    <div class="rates-footer">
        Powered by
        <img class="rates-footer__img" src="../assets/sandpit-logo.png">
    </div>
  </div>
</template>

<script>

import VueLoadingButton from 'vue-loading-button'
import { VueGoodTable } from 'vue-good-table'

import 'vue-good-table/dist/vue-good-table.css'
import store from '@/store'
import { API_HOST } from '@/constants'

export default {
  name: 'Rates',
  components: {
    VueLoadingButton,
    VueGoodTable
  },
  data: function () {
    return {
      ratesLoading: false,
      apiKey: ''
    }
  },
  mounted () {
    store.setMessageAction('hey')
    this.getRates()
  },
  computed: {
    ratesRows () {
      return this.$root.$data.sharedState.rates
    },
    ratesColumns () {
      return [
        {
          label: 'Source',
          field: 'source'
        },
        {
          label: 'Target',
          field: 'target'
        },
        {
          label: 'Rate',
          field: 'rate'
        }
      ]
    }
  },
  methods: {
    async getRates () {
      this.ratesLoading = true
      let rates = []
      try {
        const response = await fetch(`https://transferwise.${API_HOST}/v1/rates?source=gbp`,
          {
            method: 'GET',
            headers: { 'sandpit-key': this.apiKey }
          }
        )
        rates = await response.json()
      } catch (Exception) {
        console.log('Error getting rates from TransferWise')
      }

      store.setRatesWithLimit(rates, 10)
      this.ratesLoading = false
    },

    setApiKey (_event) {
      this.apiKey = this.$refs.apiKey.value
    }
  }

}
</script>

<style lang="css">
.rates__container {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(237, 237, 237);
    padding: 30px 60px;
}
.rates-header__row {
    display: flex;
    justify-content: space-between;
}

.rates-header__logo-container {
    text-align: left;
}
.rates-header__logo {
    max-height: 60px;
}

.rates-table-header__container {
    display: flex;
    justify-content: space-between;
}

.rates-table-header__actions {
    align-self: center;
}
.rates-table-header__btn {
    border-radius: 3px;
    background-color: grey;
    padding: 4px 12px;
}

.rates-table__container {
    min-height: 300px;
}

.rates-footer {
    margin-top: 50px
}
.rates-footer__img::before {
    content: "Powered By";
}
.rates-footer__img {
    max-height: 40px;
    margin-top: 4px;
    display: block;
}
</style>
