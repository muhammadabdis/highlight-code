export default {
  data () {
    return {
      alert: {
        show: false,
        type: 'error',
        message: ''
      }
    }
  },
  methods: {
    hideAlert () {
      setTimeout(() => this.alert.show = false, 3000)
    }
  }
}