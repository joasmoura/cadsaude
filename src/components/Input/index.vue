<template>
<div class="mb-3">
    <label :for="label" class="form-label">{{ label }}</label>
    <template v-if="type.includes('text', 'number', 'email')">
        <Field as="type" :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="form-control" :class="errorMessage ? ' is-invalid' : ''" :id="label" :placeholder="placeholder" :rules="rules" @blur="handleBlur"/>
        <input
            :name="name"
            :id="name"
            :type="type"
            :value="inputValue"
            :placeholder="placeholder"
            @input="handleChang"
            @blur="handleBlur"
            class="form-control" :class="errorMessage ? ' is-invalid' : ''"
        />
    </template>

    <template v-else-if="type.includes('select')">
        <!-- <Field v-slot="{ field }" :name="name" :rules="rules">
            <select :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="field" class="form-select" :class="errorMessage ? ' is-invalid' : ''" @blur="handleBlur">
                <slot/>
            </select>
        </Field> -->
    </template>

    <div class="invalid-feedback">
        {{ errorMessage }}
    </div>
</div>
</template>

<script>
import { toRef } from 'vue'
import { Field, useField } from 'vee-validate';
export default {
  components: {
    Field 
  },
  props: {
    name: String,
    modelValue: String,
    label: String,
    type: String,
    placeholder: String,
    rules: Function
  },
  emits: ['update:modelValue'],
  setup(props) {
    const name = toRef(props, 'name')

    const {
        modelValue: inputValue,
        errorMessage,
        handleBlur,
        handleChange,
        meta
    } = useField(name, undefined, {
      initialValue: props.value,
    })

    return {
        handleChange,
        handleBlur,
        errorMessage,
        inputValue,
        meta
    }
  }
}
</script>

<style>

</style>