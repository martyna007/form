<template>
  <n-card :bordered="false" style="max-width: 600px;box-shadow: 0 0 14px rgb(0 0 0 / 20%);margin: 0 auto;">
    <n-h2 style="margin: 0;text-align: center; color: #35D5CB">Welcome to ArcticForm!</n-h2>
    <n-h4 style="margin: 0 0 30px 0;text-align: center">Please fill the form below</n-h4>
    <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules"
    >
      <n-grid cols="6 m:24" responsive="screen" x-gap="24">
        <n-form-item-gi :span="12" label="First name" path="firstname">
          <n-input v-model:value="formValue.firstname" clearable :placeholder="rules.firstname.placeholder" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Last name" path="lastname">
          <n-input v-model:value="formValue.lastname" clearable :placeholder="rules.lastname.placeholder" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="E-mail" path="email">
          <n-input v-model:value="formValue.email" clearable :placeholder="rules.email.placeholder" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Phone" path="phone">
          <n-input v-model:value="formValue.phone" clearable :placeholder="rules.phone.placeholder" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Birthday" path="birthday">
          <n-date-picker :actions="null" v-model:formatted-value="formValue.birthday" clearable value-format="yyyy-MM-dd" type="date" :placeholder="rules.birthday.placeholder" width="100%"/>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Avatar" path="img">
          <n-upload
              placeholder="rules.img.placeholder"
              accept="image/png, image/jpg, image/jpeg"
              @before-upload="beforeUpload"
          >
            <n-button>Upload file</n-button>
          </n-upload>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="About" path="about">
          <n-input type="textarea" v-model:value="formValue.about" clearable :placeholder="rules.about.placeholder" />
        </n-form-item-gi>
        <n-gi :span="24">
          <div style="display: flex; justify-content: center">
            <n-button type="primary" @click="handleValidateClick" size="large">
              Submit
            </n-button>
          </div>
        </n-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import {
  NCard,
  NForm,
  NGrid,
  NGi,
  NUpload,
  NFormItemGi,
  NButton,
  NInput,
  FormInst,
  useMessage,
  NH4,
  NH2,
  UploadFileInfo,
  NDatePicker
} from 'naive-ui'
import {reactive, ref} from 'vue'
const rules = {
    firstname: {
      required: true,
      message: 'Please input your first name',
      placeholder: 'Input first name'
    },
    lastname: {
      required: true,
      message: 'Please input your last name',
      placeholder: 'Input last name'
    },
    email: {
      required: true,
      message: 'Please input your email',
      placeholder: 'Input email'
    },
    phone: {
      required: false,
      placeholder: 'Input phone number'
    },
    birthday: {
      required: false,
      placeholder: 'Input date of birth'
    },
    img: {
      required: false,
      placeholder: 'Choose file'
    },
    about: {
      required: false,
      placeholder: 'Tell something about yourself'
    }
}
const formRef = ref<FormInst | null>(null)
const formValue = reactive({
  firstname: null,
  lastname: null,
  email: null,
  phone: null
})
const message = useMessage()
const acceptedImgFormats: string[] = ['image/png', 'image/jpg', 'image/jpeg']

function handleValidateClick(e: MouseEvent): void {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Submission success')
    } else {
      message.error('Please correct form')
    }
  })
}
async function beforeUpload(data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}): Promise<boolean> {
  if (!acceptedImgFormats.includes(data.file.file?.type as string)) {
    message.error(
        'Only upload picture files, please re-upload.'
    )
    return false
  }
  return true
}
</script>

<style scoped>
.n-card > .n-card-header {
  padding-bottom: 0;
}
.n-upload-trigger + .n-upload-file-list {
  margin-top: 0;
}
.n-date-picker {
  width: 100%;
}
</style>