<template pagination="pagination">
    <div class="text-xs-center">
        <v-pagination
                v-model="pagination.page"
                :length="Math.floor(pagination.totalItems/pagination.rowsPerPage) + 1"
                circle
        ></v-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:{
            pagination: {
                type: Object,
                default: function () {
                    return {
                        descending: true,
                        page: 1,
                        rowsPerPage: 10, // -1 for All
                        sortBy: "",
                        totalItems: 2
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>