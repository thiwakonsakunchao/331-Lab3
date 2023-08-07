<script setup lang="ts">
import  { type EventItem } from '@/type';
import type { ref, PropType } from 'vue'
import EventService from '@/services/EventService'



defineProps({
    event: {
        type: Object as PropType<EventItem>,
        require: true
    }
})
</script>

<template>
    <!-- <div v-if="event">
        <h1>{{  event.title }}</h1>
        <div id="nav">
            <router-link :to="{ name: 'event-detail', params:{ id }}">Details</router-link>
            |
            <router-link :to="{ name: 'event-register', params:{ id }}">Register</router-link>
            |
            <router-link :to="{ name: 'event-edit', params:{ id }}">Edit</router-link>
        </div>
        <p>Edit the event here</p>
    </div> -->
    <p>Edit the event here</p>
</template>