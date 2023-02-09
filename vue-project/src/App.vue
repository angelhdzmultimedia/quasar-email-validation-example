<script setup lang="ts">
import { ref } from 'vue'
import { Dark } from 'quasar'

Dark.set(true)

const email = ref('')
const password = ref('')
const firstname = ref('')

function emailRule(val) {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val) || val === '' || 'Invalid email'
}

function emptyRule(message = 'Field required') {
  return (val) => !!val || message
}

function charLimitRule(min, max, message = null) {
  return (val) =>
    ((val.length >= min && val.length <= max) || message) ??
    `Field must contain from ${min} to ${max} characters.`
}

function onSubmit() {
  const payload = {
    email: email.value,
    password: password.value,
    firstname: firstname.value,
  }
  alert(`Registering as: ${JSON.stringify(payload, null, 2)}`)
}
</script>

<template>
  <q-form @submit.prevent="onSubmit" class="column q-gutter-sm">
    <q-input
      v-model="firstname"
      filled
      label="First Name"
      lazy-rules
      :rules="[emptyRule('First Name required')]"
    />
    <q-input
      filled
      v-model="email"
      label="Email"
      lazy-rules
      :rules="[emailRule, emptyRule('Email required')]"
    />
    <q-input
      v-model="password"
      filled
      label="Password"
      type="password"
      lazy-rules
      counter
      :rules="[charLimitRule(6, 12), emptyRule('Password required')]"
    />
    <q-btn color="primary" type="submit">Register</q-btn>
  </q-form>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
