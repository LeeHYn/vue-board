<template>
    <div>
        <input type="file" @change="handleFileChange" />
        <button @click="uploadFile">Upload</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            file: null,
            userId: '123' // Replace with the actual user ID
        };
    },
    methods: {
        handleFileChange(event) {
            this.file = event.target.files[0];
        },
        async uploadFile() {
            if (this.file) {
                const formData = new FormData();
                formData.append('file', this.file);
                formData.append('userId', this.userId);

                try {
                    const response = await axios.post('/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    console.log(response.data); // Handle the response data as needed
                } catch (error) {
                    console.error(error);
                    // Handle the error
                }
            }
        }
    }
};
</script>