<template>
    <div>
        <div v-if="isLoading">Loading players...</div>
        <div v-else>
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Points</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="player in players">
                    <tr v-bind:key="player.id">
                        <td>{{ player.id }}</td>
                        <td>{{ player.first_name }}</td>
                        <td>{{ player.last_name }}</td>
                        <td>{{ player.points }}</td>
                        <td>
                            <button class="button is-primary" v-bind:class="{ 'is-loading' : isCountUpdating(player.id) }" @click="answer(player.id, 'increment')">+1</button>&nbsp;
                            <button class="button is-primary" v-bind:class="{ 'is-loading' : isCountUpdating(player.id) }" @click="answer(player.id, 'decrement')">(-1)</button>&nbsp;
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '../config'
import Vue from 'vue'

export default {
    methods: {
        isCountUpdating(id) {
            let index = this.players.findIndex(player => player.id === id)
            return this.players[index].isCountUpdating
        },
        async answer(id, userAction) {
            let data = {
                action: userAction
            }
            let index = this.players.findIndex(player => player.id === id)
            Vue.set(this.players[index], 'isCountUpdating', true)
            await axios.post(API_BASE_URL + '/players/' + id + '/points', data)
            const response = await axios.get(API_BASE_URL + '/players')
            this.players = response.data.data
        }
    },
    data() {
        return {
            isLoading: true,
            players: {}
        }
    },
    async created () {
        try {
            const response = await axios.get(API_BASE_URL + '/players')
            this.players = response.data.data
            this.isLoading = false
        } catch (e) {
            // handle the authentication error here
        }
    }
}
</script>