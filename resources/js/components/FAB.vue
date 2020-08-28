<template>
    <v-btn
      bottom
      color="blue"
      dark
      fab
      fixed
      right
      @click="popupDialog('contactDialog')"

    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'FloatingButton',
    data () {
         return {
            direction: 'top',
            fab: false,
            fling: false,
            hover: false,
            tabs: null,
            top: false,
            right: true,
            bottom: true,
            left: false,
            transition: 'slide-y-reverse-transition',
            addressButton: false,
            editOrderButton: false
        }
    },
    methods: {
        
        popupDialog (form, action=null) {
            this.$emit('popupFormDialog', {form: form, action:action})
        }

    }
}
</script>