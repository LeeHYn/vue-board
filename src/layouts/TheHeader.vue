<template>
    <div>
        <div class="nav-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="container-fluid">
                                <a class="navbar-brand" href="#"><i class="dummy_icons"></i> Navbar</a>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent1">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                            <a class="nav-link" href="#"><i class="dummy_icons"></i> 마이페이지</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#"><i class="dummy_icons"></i> 로그인</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-wrapper">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent2">
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#">영화</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">예매</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">이벤트</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.nav-wrapper {
    margin-left: 5%;
    margin-right: 5%;
}

.navbar {
    width: 100%;
}

.navbar-nav {
    width: 100%;
    justify-content: center;
}

.dummy_icons {
    /* Add your icon styling here */
}

.nav-link {
    display: flex;
    align-items: center;
}
</style>
