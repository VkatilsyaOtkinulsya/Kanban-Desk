<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-vue-next';
import Input from '../selfmade-input/Input.vue';
import { ref } from 'vue';
import Textarea from '../textarea/Textarea.vue';
import Button from '../button/Button.vue';

const name = ref('');
</script>

<template>
  <Dialog>
    <DialogTrigger class="w-full">
      <div
        variant="ghost"
        className="w-full flex items-center p-2\.5 justify-center gap-2.5 h-auto bg-[rgba(17,16,18,0.05)] hover:bg-[rgba(17,16,18,0.1)] p-2.5 rounded-[6px] border-none transition ease-in duration-200"
      >
        <PlusIcon className="h-4 w-4 text-[#111012]/70" />
        <span className="text-sm font-medium text-[#111012]/70"> Добавить проект </span>
      </div>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Добавить проект</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
        <div class="grid w-full gap-1.5">
          <Input :modelValue="name" type="text" placeholder="Название проекта" />
          <Textarea placeholder="Описание" class="resize-none" />
        </div>
      </DialogHeader>

      <DialogFooter>
        <Button>Создать</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
