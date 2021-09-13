<template>
    <header>
        <div class="logo-box">
            Header Layout
        </div>
    </header>
    <main>
        <router-view></router-view>
    </main>
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped>

header 
    width: 100%
    height: 3rem
    padding: 0.5rem 1rem
    display: flex
    justify-content: space-between
    align-items: center
    background: #EEE

    .logo-box
        height: 100%
        font-size: 1.5rem
        font-weight: 700
        display: flex
        justify-content: flex-start
        align-items: center

</style>