<template>
  <div class="py-10">
    <div class="text-center leading-snug mb-16">
      <h1 class="text-5xl">{{ `👋 Welcome ${userName}!` }}</h1>
      <p class="text-lg mb-5">Highlight your code at down below</p>
      <button class="px-5 py-3 bg-white text-pink-500 border border-pink-500 text-base tracking-widest rounded font-bold" @click="onLogout">LOGOUT</button>
    </div>

    <actions-section
      class="mb-5"
      @download="downloadCode"
      @reset="resetOptions"
      @save="saveCode"
    />

    <options-section
      :file-name.sync="formData.fileName"
      :highlight.sync="formData.highlight"
      :lang.sync="formData.lang"
      :two-slash.sync="formData.twoslash"
      :languages="languages"
      :two-slashes="['typescript', 'json'].includes(formData.lang) ? twoSlashes : []"
      class="mb-10"
    />

    <code-section :code.sync="formData.code" :lang="formData.lang" :highlightedCode="highlightedCode" />
  </div>
</template>

<script>
import OptionsSection from './OptionSection'
import CodeSection from './CodeSection'
import ActionsSection from './ActionsSection'
import { URL_API } from "../constants"
import { post, download } from '../utils'

export default {
  name: 'Main',
  components: {
    OptionsSection,
    CodeSection,
    ActionsSection
  },
  watch: {
    formData: {
      async handler (val) {
        this.$store.dispatch('notification/showNotification', {
          type: '',
          message: 'Communicating to server...'
        })

        const query = await this.getHighlightQuery()

        try {
          const res = await post('/', query, { code: val.code })
  
          this.highlightedCode = typeof res.data === 'string' ? res.data : ''
        } catch (err) {
          this.$store.dispatch('notification/showNotification', {
            type: 'error',
            message: 'Failed to highlight code'
          })

          console.log(err)
        }
      },
      deep: true
    }
  },
  data () {
    return {
      formData: {
        fileName: '',
        highlight: '',
        lang: '',
        twoslash: '',
        code: ''
      },
      languages: [],
      twoSlashes: [],
      highlightedCode: ''
    }
  },
  computed: {
    userName () {
      return this.$store.getters['user/getUser'].name
    }
  },
  created () {
    this.getOptions()
  },
  methods: {
    async onLogout () {
      await this.$store.dispatch('user/logout')
    },
    async getOptions () {
      this.$store.dispatch('notification/showNotification', {
        type: '',
        message: 'Communicating to server...'
      })

      try {
        const res = await fetch(`${URL_API}/options`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())

        this.languages = res.data.languages
        this.twoSlashes = res.data.twoslashes
      } catch (err) {
        this.$store.dispatch('notification/showNotification', {
          type: 'error',
          message: 'Failed to fetch languages'
        })
      }
    },
    resetOptions () {
      this.formData.fileName = ''
      this.formData.highlight = ''
      this.formData.lang = ''
      this.formData.twoslash = ''
      this.formData.code = ''
    },
    async getHighlightQuery () {
      let query = {}
      await Object.keys(this.formData).map(v => {
        if (v !== 'code') query[v] = this.formData[v]

        return v
      })

      return query
    },
    async downloadCode () {
      this.$store.dispatch('notification/showNotification', {
        type: '',
        message: 'Communicating to server...'
      })

      try {
        const query = await this.getHighlightQuery()
        query.download = 1
  
        await download('/', query, { fileName: `${new Date().getTime()}-code.png`, code: this.formData.code })
      } catch (err) {
        this.$store.dispatch('notification/showNotification', {
          type: 'error',
          message: 'Failed to download file'
        })

        console.log(err)
      }
    },
    async saveCode () {
      this.$store.dispatch('notification/showNotification', {
        type: '',
        message: 'Communicating to server...'
      })

      try {
        let content = {}
        await Object.keys(this.formData).map(v => {
          if (this.formData[v]) content[v] = this.formData[v]

          return v
        })

        const data = {
          user: this.$store.state.user.id,
          content
        }

        const res = await post('/code/store', {}, data)

        if (res.success) {
          this.$store.dispatch('notification/showNotification', {
            type: 'success',
            message: 'Code saved successfully'
          })
        } else {
          this.$store.dispatch('notification/showNotification', {
            type: 'error',
            message: 'Failed to save code'
          })
        }
      } catch (err) {
        this.$store.dispatch('notification/showNotification', {
          type: 'error',
          message: 'Failed to save code'
        })

        console.log(err)
      }
    }
  }
}
</script>
