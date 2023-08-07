<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref, watchEffect , type Ref , computed } from 'vue'
import EventService from '@/services/EventService'
import type { AxiosResponse } from 'axios';
import { useRouter } from 'vue-router'

const events : Ref<Array<EventItem>> = ref([])
  const totalEvent = ref<number>(0)
  const props = defineProps({
    page: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    }

  })

    watchEffect(() =>{
      
      EventService.getEvent(props.limit, props.page).then((response: AxiosResponse<EventItem[]>)=>{
      events.value = response.data
      totalEvent.value = response.headers['x-total-count']
 
    })
    })
   const hasNextPage = computed(() => {
    // first calculate the total page
   const totalPages = Math.ceil(totalEvent.value / 2 )
   return props.page.valueOf() < totalPages

   })

   const router = useRouter()
   const limit = ref(props.limit)
   const increaseLimit = () =>{
    limit.value++;
    router.push({name: 'EventList', query: { page: props.page, limit: limit.value}})
   }

   const decreaseLimit = () =>{
    if (limit.value > 1){
      limit.value--;
      router.push({ name: 'EventList', query: { page: props.page, limit: limit.value}})
    }
   }
</script>

<template>
  <h1>Event For Good <button @click="increaseLimit">Plus</button>
    <button @click="decreaseLimit">Minus</button>
    {{ limit }}
  </h1>

  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>

    <div class="pagination">

      <RouterLink :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev" v-if="page !=1" id="page-prev">
    Prev Page
    </RouterLink>

    <RouterLink :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next" v-if="hasNextPage" id="page-next">
    Next Page
    </RouterLink>

    </div>
    
    
  </main>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination{
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev{
  text-align: left;
}

#page-next {
  text-align: right;
}

</style>
