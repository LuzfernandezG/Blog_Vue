<template>
    <div class="contain-banner">
    </div>
</template>
<script setup>
</script>
<style>
.h1-info {
    font-size: 3rem;
}

.p-info {
    font-size: 1.2rem;
}

.contain-banner {

    width: 100%;
    height: 90vh;
    animation-name: changeBackground;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes changeBackground {
    0% {
        background-image: url('../../public/1.png');
    }

    33% {
        background-image: url('../../public/2.png');
    }

    66% {
        background-image: url('../../public/1.png');
    }

    100% {
        background-image: url('../../public/3.png');
    }
}
</style>