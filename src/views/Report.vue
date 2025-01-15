<template>
  <div class="pdf-preview">
    <iframe v-if="pdfDataUrl" :src="pdfDataUrl" class="w-full h-screen"></iframe>
  </div>
</template>

<script>
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      pdfDataUrl: null,
    };
  },
  mounted() {
    this.generatePDF()
  },  
  methods: {
    generatePDF() {
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.text('Hello from jsPDF!', 10, 10); // Add your PDF content
      
      // Generate a Blob and convert it to an Object URL to display in iframe
      const pdfBlob = doc.output('blob');
      this.pdfDataUrl = URL.createObjectURL(pdfBlob);
    }
  }
};
</script>

<style scoped>
.pdf-preview {
  text-align: center;
}
iframe {
  border: none;
}
</style>
