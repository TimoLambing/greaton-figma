<template>
  <div class="flex flex-col justify-center px-8 py-10 bg-white max-md:px-5">
    <header class="bg-sky-600">
      <nav class="justify-center items-start py-10 pr-16 pl-40 text-3xl font-semibold leading-10 text-white whitespace-nowrap max-md:pr-5 max-md:pl-8 max-md:max-w-full">Töökuuulutuse generaator</nav>
    </header>
    <main class="flex flex-col lg:flex-row p-8 bg-white max-md:max-w-full">
      <section class="flex flex-col w-full mr-6 lg:w-2/6 h-full items-start">
        <div class="flex gap-5 flex-col max-md:gap-0 w-full items-center">
          <aside class="w-full px-4 md:px-12">
            <div class="flex flex-col mt-12 max-md:mt-10">
              <h2 class="text-xl leading-7 text-neutral-700">Koosta töökuulutus</h2>
              <p class="mt-11 text-xs leading-4 text-zinc-800 max-md:mt-10">Foto</p>

              <!-- Foto valik -->
              <UInputMenu 
                v-model="selected" 
                :options="photos" 
                option-attribute="name" 
                trailing-icon="i-heroicons-chevron-up-down-20-solid"
                class="w-full py-2 px-2 text-sm whitespace-nowrap rounded-2xl border border-solid border-gray-300 text-neutral-700 max-md:pr-5 mt-2"
                placeholder="Vali foto..."
                variant="none"
                @update:modelValue="onSelectImage">
                <span class="self-start">{{ photos.name }}</span>
              </UInputMenu>

              <p class="mt-9 text-xs leading-4 text-zinc-800">Kes otsib?</p>

              <!-- Poe valik -->
              <UInputMenu 
                v-model="selected1" 
                :options="pood" 
                option-attribute="name" 
                trailing-icon="i-heroicons-chevron-up-down-20-solid"
                class="w-full py-2 px-2 text-sm whitespace-nowrap rounded-2xl border border-solid border-gray-300 text-neutral-700 max-md:pr-5 mt-2"
                placeholder="Vali foto..."
                variant="none"
                @click="onSelectCompany">
                <span class="self-start">{{ pood.name }}</span>
              </UInputMenu>

              <div class="flex gap-5 justify-between mt-9 text-xs leading-4">
                <p class="text-zinc-800">Keda otsib?</p>
                <span class="text-right text-neutral-400">60 tähemärki</span>
              </div>

              <UInput 
                v-model="inputValue"
                color="gray" 
                variant="none" 
                placeholder="Ostujuhti..."
                class="w-full py-2 px-2 text-sm whitespace-nowrap rounded-2xl border border-solid border-gray-300 text-neutral-700 max-md:pr-5 mt-2"
              />

              <div class="flex gap-5 justify-between mt-9 text-xs leading-4">
                <p class="text-zinc-800">Töö lühikirjeldus</p>
                <span class="text-right text-neutral-400">120 tähemärki</span>
              </div>
              
              <div>
                <UTextarea
                  v-model="inputValueDescription"
                  autoresize
                  :maxrows="15"
                  placeholder="Kirjelda seda tööd..."
                  variant="none" 
                  class="w-full py-2 px-2 text-sm  rounded-2xl border border-solid border-gray-300 text-neutral-700 max-md:pr-5 mt-2"
                />
              </div>

              <UCheckbox v-model="pakkumine" class="mt-6 mb-2">
                <template #label>
                  <span  class="text-right text-xs">Pakkumine</span>
                </template>
              </UCheckbox>

              <div v-if="pakkumine">
                <UCard class="mt-2">
                    <template #header>
                        <div class="flex justify-between items-center">
                            <span class="text-sm whitespace-nowrap">Pakume sulle</span>
                            <div v-if="editor" class="whitespace-nowrap">
                                <button
                                @click="editor.chain().focus().toggleBold().run()"
                                :disabled="!editor.can().chain().focus().toggleBold().run()"
                                :class="{ 'is-active': editor.isActive('bold'), }"
                                class="mr-1"
                                >
                                <Icon name="material-symbols:format-bold-rounded" class="h-5 w-5" />
                                </button>
                                <button
                                @click="editor.chain().focus().toggleItalic().run()"
                                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                                :class="{ 'is-active': editor.isActive('italic') }"
                                class="mr-1"
                                >
                                <Icon name="material-symbols:format-italic-rounded" class="h-5 w-5" />
                                </button>
                                <button
                                @click="editor.chain().focus().toggleStrike().run()"
                                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                                :class="{ 'is-active': editor.isActive('strike') }"
                                class="mr-1"
                                >
                                <Icon name="material-symbols:format-strikethrough-rounded" class="h-5 w-5" />
                                </button>
                                <button
                                @click="editor.chain().focus().toggleBulletList().run()"
                                :class="{ 'is-active': editor.isActive('bulletList') }"
                                class="mr-1"
                                >
                                <Icon name="material-symbols:format-list-bulleted-rounded" class="h-5 w-5" />
                                </button>
                                <button
                                @click="editor.chain().focus().toggleOrderedList().run()"
                                :class="{ 'is-active': editor.isActive('orderedList') }"
                                class="mr-1"
                                >
                                <Icon name="material-symbols:format-list-numbered-rounded" class="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </template>   
                  <TiptapEditorContent :editor="editor" />
                </UCard>
            </div>

            <div>
              <UCard class="mt-2">
                  <template #header>
                      <div class="flex justify-between items-center">
                          <span class="text-sm whitespace-nowrap">Sobiv kandidaat</span>
                          <div v-if="editor2" class="whitespace-nowrap">
                              <button
                              @click="editor2.chain().focus().toggleBold().run()"
                              :disabled="!editor2.can().chain().focus().toggleBold().run()"
                              :class="{ 'is-active': editor2.isActive('bold'), }"
                              class="mr-1"
                              >
                              <Icon name="material-symbols:format-bold-rounded" class="h-5 w-5" />
                              </button>
                              <button
                              @click="editor2.chain().focus().toggleItalic().run()"
                              :disabled="!editor2.can().chain().focus().toggleItalic().run()"
                              :class="{ 'is-active': editor2.isActive('italic') }"
                              class="mr-1"
                              >
                              <Icon name="material-symbols:format-italic-rounded" class="h-5 w-5" />
                              </button>
                              <button
                              @click="editor2.chain().focus().toggleStrike().run()"
                              :disabled="!editor2.can().chain().focus().toggleStrike().run()"
                              :class="{ 'is-active': editor2.isActive('strike') }"
                              class="mr-1"
                              >
                              <Icon name="material-symbols:format-strikethrough-rounded" class="h-5 w-5" />
                              </button>
                              <button
                              @click="editor2.chain().focus().toggleBulletList().run()"
                              :class="{ 'is-active': editor2.isActive('bulletList') }"
                              class="mr-1"
                              >
                              <Icon name="material-symbols:format-list-bulleted-rounded" class="h-5 w-5" />
                              </button>
                              <button
                              @click="editor2.chain().focus().toggleOrderedList().run()"
                              :class="{ 'is-active': editor2.isActive('orderedList') }"
                              class="mr-1"
                              >
                              <Icon name="material-symbols:format-list-numbered-rounded" class="h-5 w-5" />
                              </button>
                          </div>
                      </div>
                  </template>   
                <TiptapEditorContent :editor="editor2" />
              </UCard>
            </div>

              <div class="flex gap-5 justify-between mt-9 text-xs leading-4">
                <p class="text-zinc-800">Kontakt</p>
              </div>

              <UInput
                v-model="inputValueContact"
                color="gray" 
                variant="none" 
                placeholder="Sisesta e-mail..."
                class="w-full py-2 px-2 text-sm whitespace-nowrap rounded-2xl border border-solid border-gray-300 text-neutral-700 max-md:pr-5 mt-2 mb-2"
                />

              <UInput 
                v-model="inputValueContact1"
                color="gray" 
                variant="none" 
                placeholder="Sisesta telefoni number..."
                class="w-full py-2 px-2 text-sm whitespace-nowrap rounded-2xl border border-solid border-gray-300 text-neutral-700 max-md:pr-5 mt-2"
                />

            </div>
          </aside>
        </div>
      </section>
      <aside class="flex flex-col lg:w-[60%] w-full">
        <article class="flex flex-col grow px-10 xl:px-20 md:py-12 w-full bg-white rounded-2xl shadow-lg max-md:px-5 max-md:mt-10 items-center">
          <div class="w-[600px] max-w-full">
            <h2 class="text-xl leading-7 text-neutral-700">Töökuulutuse eelvaade</h2>
            <p class="mx-2 mt-11 text-xs font-semibold leading-4 text-neutral-400 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">Mõeldud cv online ja cv keskusesse laadimiseks.<br />Dokumendi laius 600px.</p>
          </div>
          <div class="flex w-full items-center justify-center">
            <div class="circle-overlay relative overflow-hidden flex flex-col pb-12 md:mx-5 mt-4 max-w-full min-h-[1199px] w-[600px] bg-gradient-to-b from-sky-300 to-sky-700 z-7">
              <!-- Flex container for image, align items to the right -->
              <div class="top-gray-box absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-16 h-20 z-8"></div>
              <div class="flex justify-end w-full mt-6 z-10">
                <img :src="selectedImagePath" alt="Selected Image" class="w-[80%] md:w-[69%] xl:w-[60%]" />
              </div>
              <div class="m-12 z-10">
                <h2 class="text-white text-2xl font-light">{{ selected1.name }} otsib</h2>
                <h1 class="text-white text-4xl mt-2 font-semibold tracking-widest">{{ inputValue }}</h1>
                <h3 class="text-gray-100 text-md mt-2">{{ inputValueDescription }}</h3>
                <div v-if="pakkumine" class="m-4">
                  <h3 class="text-gray-100 text-md mt-2 font-semibold">Pakume sulle</h3>
                  <div class="ml-4 mt-2 text-gray-100 text-xs tracking-wide" v-html="editorContentHtml"></div>
                </div>
                <div class="m-4">
                  <h3 class="text-gray-100 text-md mt-2 font-semibold">Sobiv kandidaat</h3>
                  <div class="ml-4 mt-2 text-gray-100 text-xs tracking-wide" v-html="editorContentHtml2"></div>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row items-center">
                <div class="w-40 h-40 mx-6 flex flex-col justify-center items-center overflow-hidden rounded-full m-4">
                  <img src="/public/man.jpg" alt="koer" class="object-cover w-full h-full rounded-full" />
                </div>
                <div class="flex flex-col h-full items-end justify-end ">
                  <div class="bg-green-300 w-80 rounded-full p-4 text-center justify-center">
                    <p class="text-black text-xs font-semibold tracking-wide">Saada CV aadressile: {{ inputValueContact }}</p>
                    <p class="text-black text-xs font-semibold tracking-wide">Lisainfo telefonil: {{ inputValueContact1 }}</p>
                  </div>
                  <div class="w-80 h-16">
                    <h3 class="text-gray-100 text-xl mt-2 text-center">Teeme kohaliku elu paremaks!</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </aside>
    </main>
    <footer class="justify-center items-center px-16 pt-20 pb-16 mt-20 text-xs font-semibold leading-4 text-center bg-neutral-50 text-neutral-400 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      Copyright 2024
    </footer>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { ref, computed } from 'vue'
import womanImg from '~/assets/img/woman.jpg'
import manImg from '~/assets/img/man.jpg';
import robotImg from '~/assets/img/robot.jpg';
import dogImg from '~/assets/img/dog.jpg';

const photos = [
  { name: 'Naise foto', path: womanImg },
  { name: 'Mehe foto', path: manImg },
  { name: 'Roboti foto', path: robotImg },
  { name: 'Koera foto', path: dogImg },
];

const pood = [
  { name: 'Coop'},
  { name: 'Selver'},
  { name: 'Rimi'},
  { name: 'Prisma' },
];

const selected = ref(photos[0]);
const selected1 = ref(pood[0]);
const pakkumine = ref(false);
const inputValue = ref('');
const inputValueDescription = ref('');
const inputValueContact = ref('');
const inputValueContact1 = ref('');
const editorContentHtml = ref('');
const editorContentHtml2 = ref('');
const selectedImagePath = computed(() => selected.value.path);
const editor = useEditor({
    content: "<ul><li>Esimene argument</li><li>Teine argument</li><li>Kolmas argument</li><li>Neljas argument</li><li>Viies argument</li></ul>",
    extensions: [TiptapStarterKit],
  });

  const editor2 = useEditor({
    content: "<ul><li>Esimene argument</li><li>Teine argument</li><li>Kolmas argument</li><li>Neljas argument</li><li>Viies argument</li></ul>",
    extensions: [TiptapStarterKit],
  });

  const emit = defineEmits(['update:content']);

function onSelectImage(selectedOptionName: string) {
  const foundPhoto = photos.find(photo => photo.name === selectedOptionName);
  if (foundPhoto) {
    selected.value = foundPhoto;
  }
}

function onSelectCompany(selectedOptionName: string) {
  const foundCompany = pood.find(p => p.name === selectedOptionName);
  if (foundCompany) {
    selected1.value = foundCompany; // Make sure this is updating correctly
  }
}


  
watch(
  () => editor.value?.getHTML(),
  (newHtml) => {
    editorContentHtml.value = newHtml || ''; 
  },
  { immediate: true }
);

watch(
  () => editor2.value?.getHTML(),
  (newHtml) => {
    editorContentHtml2.value = newHtml || ''; 
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
  if (editor2.value) {
    editor2.value.destroy();
  }
});
</script>



<style scoped lang="scss">
.circle-overlay {
  &::before {
    content: "";
    position: absolute;
    top: -10%;
    right: 0;
    width: 950px;
    height: 1000px;
    background: radial-gradient(circle, #7dd3fc 0%, #0369a1 100%);
    border-radius: 50%;
    z-index: 8;
    transform: translate(35%, -35%);
  }
}

.top-gray-box {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 200px;
  background-color: rgb(236, 236, 236);
  z-index: 9;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>


