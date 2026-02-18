<script setup>
const props = defineProps({
  visible: Boolean,
  loading: Boolean,
  form: Object,
  title: String
})
const emit = defineEmits(['submit', 'update:visible'])
</script>

<template>
  <div v-if="props.visible" @click.self="$emit('update:visible', false)">
    <div>
      <h3>{{ props.title }}</h3>
      <form @submit.prevent="$emit('submit')">
        <div>
          <label>Nombre Completo</label>
          <input v-model="props.form.name" required maxlength="100" />
        </div>

        <div>
          <label>Email</label>
          <input v-model="props.form.email" type="email" required />
        </div>

        <div>
          <label>DNI</label>
          <input v-model="props.form.dni" maxlength="9" />
        </div>

        <div>
          <label>Teléfono</label>
          <input v-model="props.form.telefono" maxlength="15" />
        </div>

        <div>
          <label>Fecha de nacimiento</label>
          <input v-model="props.form.fecha_nacimiento" type="date" />
        </div>

        <div v-if="!props.title.includes('Editar')">
          <label>Contraseña</label>
          <input
            v-model="props.form.password"
            type="password"
            required
            minlength="8"
          />
        </div>

        <div v-if="!props.title.includes('Editar')">
          <label>Confirmar contraseña</label>
          <input
            v-model="props.form.password_confirmation"
            type="password"
            required
            minlength="8"
          />
        </div>

        <div>
          <button type="button" @click="$emit('update:visible', false)" :disabled="props.loading">
            Cancelar
          </button>
          <button type="submit" :disabled="props.loading">
            {{ props.loading ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
