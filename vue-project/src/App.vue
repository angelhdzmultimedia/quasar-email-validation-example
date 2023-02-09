<script setup lang="ts">
import { ref } from 'vue'
import { Dark } from 'quasar'

Dark.set(true)

// Props
const email = ref('')
const password = ref('')
const firstname = ref('')

// Validation
function emailValidation(message = 'Email not valid') {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return (val) => emailPattern.test(val) || val === '' || message
}

function emptyValidation(message = 'Field required') {
  return (val) => !!val || message
}

function charLimitValidation(min, max, message = null) {
  return (val) =>
    ((val.length >= min && val.length <= max) || message) ??
    `Field must contain from ${min} to ${max} characters.`
}

// Events
function onSubmit() {
  const payload = {
    email: email.value,
    password: password.value,
    firstname: firstname.value,
  }
  alert(`Registering as: ${JSON.stringify(payload, null, 2)}`)
  // Call API, composable or Pinia store here to send
  // registration credentials.
}
</script>

<template>
  <q-form @submit.prevent="onSubmit" class="column q-gutter-sm">
    <q-input
      v-model="firstname"
      filled
      label="First Name"
      lazy-rules
      :rules="[emptyValidation('First Name required')]"
    />
    <q-input
      filled
      v-model="email"
      label="Email"
      lazy-rules
      :rules="[emailValidation(), emptyValidation('Email required')]"
    />
    <q-input
      v-model="password"
      filled
      label="Password"
      type="password"
      lazy-rules
      counter
      :rules="[
        charLimitValidation(6, 12),
        emptyValidation('Password required'),
      ]"
    />
    <q-btn color="primary" type="submit">Register</q-btn>
  </q-form>
</template>
