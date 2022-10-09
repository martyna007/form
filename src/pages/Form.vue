<template>
  <n-card :bordered="false" style="max-width: 600px;box-shadow: 0 0 14px rgb(0 0 0 / 20%);margin: 0 auto;">
    <template v-if="isUserData">
      <n-h2 style="margin: 0;text-align: center; color: #2bb1a8">Welcome {{ formValue.firstname }}!</n-h2>
      <n-h3 style="margin: 0 0 30px 0;text-align: center; font-weight: 600; font-size: 18px;width: 100%">You can edit your data here</n-h3>
    </template>
    <template v-else>
      <n-h2 style="margin: 0;text-align: center; color: #2bb1a8">Welcome to ArcticForm!</n-h2>
      <n-h3 style="margin: 0 0 30px 0;text-align: center; font-weight: 600; font-size: 18px;width: 100%">Please fill the form below</n-h3>
    </template>
    <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        :rules="rules"
        inline
    >
      <n-grid cols="6 m:24" responsive="screen" x-gap="24">
        <n-form-item-gi :span="12" label="First name" path="firstname">
          <n-input v-model:value="formValue.firstname" clearable placeholder="Input first name"/>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Last name" path="lastname">
          <n-input v-model:value="formValue.lastname" clearable placeholder="Input last name"/>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="E-mail" path="email">
          <n-input v-model:value="formValue.email" clearable placeholder="Input email"/>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Birthday" path="birthday">
          <n-date-picker v-model:value="formValue.birthday" v-model:formatted-value="formValue.birthdayFormatted" :actions="null" clearable placeholder="Date of birth"
                         type="date" value-format="yyyy-MM-dd" width="100%"/>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Avatar" path="img">
          <n-upload
              accept="image/png, image/jpg, image/jpeg"
              @before-upload="beforeUpload"
          >
            <n-button>Upload file</n-button>
            <span class="small">Accepted formats: png, jpg and jpeg. Max size: 2MB</span>
          </n-upload>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Phone" path="phone">
          <n-input v-model:value="formValue.phone" clearable placeholder="Input phone number"/>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="About" path="about">
          <n-input v-model:value="formValue.about" clearable placeholder="Tell us something about yourself"
                   type="textarea"/>
        </n-form-item-gi>
        <n-gi :span="24">
          <div style="display: flex; justify-content: center">
            <n-button size="large" type="primary" @click="handleSubmit">
              {{ isUserData ? 'Edit' : 'Submit' }}
            </n-button>
          </div>
        </n-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
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
  NH3,
  NH2,
  UploadFileInfo,
  NDatePicker,
  FormRules
} from 'naive-ui'
import {onMounted, reactive, ref} from 'vue'
import {validateIsValue, validateFirstName, validateLastName, validateEmail, validatePhone, validateAge} from '../helpers/validators'
import {UserData} from '../types'
import {MessageApiInjection} from 'naive-ui/es/message/src/MessageProvider'
import SessionStorageService from '../services/SessionStorageService'
import {useRouter} from 'vue-router'

const formRef = ref<FormInst | null>(null)
let formValue = reactive<UserData>({
  firstname: null,
  lastname: null,
  email: null,
  phone: null,
  birthday: null,
  birthdayFormatted: null,
  img: null,
  about: null
})
const message: MessageApiInjection = useMessage()
const acceptedImgFormats: string[] = ['image/png', 'image/jpg', 'image/jpeg']
const router = useRouter()
const isUserData = ref<boolean>(false)
const rules: FormRules = {
  firstname: [
    {
      required: true,
      message: 'First name is required',
      validator: validateIsValue
    },
    {
      required: true,
      message: 'Please input valid first name',
      validator: validateFirstName
    }],
  lastname: [
    {
      required: true,
      message: 'Last name is required',
      validator: validateIsValue
    },
    {
      required: true,
      message: 'Please input valid last name',
      validator: validateLastName
    }],
  email: [
    {
      required: true,
      message: 'E-mail is required',
      validator: validateIsValue
    },
    {
      required: true,
      message: 'Please input valid email',
      validator: validateEmail
    }],
  phone: [{
    required: false,
    message: 'Please enter valid phone number',
    validator: validatePhone
  }],
  birthday: [
    {
      required: true,
      message: 'Birthday is required',
      validator: validateIsValue
    },
    {
      required: true,
      message: 'You must be at least 18 years old',
      validator: validateAge
    }
    ],
    img: [{
      required: false,
    }],
    about: [{
      required: false
    }]
}

function handleSubmit(e: MouseEvent): void {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      SessionStorageService.getInstance().saveUserData(formValue)
      message.success('Submission success')
      router.push({
        name: 'Profile',
      })
    } else {
      message.error('Please correct form')
    }
  })
}

async function beforeUpload(data: { file: UploadFileInfo, fileList: UploadFileInfo[] }): Promise<boolean> {
  const fileSize: number | undefined = data.file.file?.size
  if (!acceptedImgFormats.includes(data.file.file?.type as string)) {
    message.warning('Accepted formats: png, jpg and jpeg. Please re-upload.')
    return false
  } else if (fileSize !== undefined && fileSize > 2000000) {
    message.warning('File too big. Please re-upload.')
    return false
  } else {
    const url: string | ArrayBuffer | undefined | null = await readURL(data.file.file as Blob)

    if (url !== null && url !== undefined) {
      formValue.img = url.toString()
    } else {
      formValue.img = null
    }
    return true
  }
}
const readURL = (file: Blob): Promise<string | ArrayBuffer | undefined | null> => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = e => res(e.target?.result)
    reader.onerror = e => rej(e)
    reader.readAsDataURL(file)
  })
}
onMounted(()=> {
  accessibilityFix()
  const service: SessionStorageService = SessionStorageService.getInstance()
  isUserData.value = service.isUserData()
  if (isUserData) {
    const serviceData: UserData = service.getUserData()
    formValue.firstname = serviceData.firstname
    formValue.lastname = serviceData.lastname
    formValue.email = serviceData.email
    formValue.birthday = serviceData.birthday
    formValue.birthdayFormatted = serviceData.birthdayFormatted
    formValue.phone = serviceData.phone
    formValue.about = serviceData.about
    formValue.img = serviceData.img
  }
})

function accessibilityFix(): void {
  const inputFileEl = document.querySelector('input[type="file"]')
  inputFileEl?.setAttribute('id', 'imgFile')
  inputFileEl?.setAttribute('placeholder', 'Choose file')
}
</script>

<style>
.n-card > .n-card-header {
  padding-bottom: 0;
}

.n-upload-trigger {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.n-upload-trigger + .n-upload-file-list {
  margin-top: 0;
}

.n-date-picker {
  width: 100%;
}

span.n-upload-file-info__thumbnail {
  line-height: 17px;
}

.small {
  font-size: 12px;
  margin: 0 10px;
  line-height: 1.2;
}
</style>