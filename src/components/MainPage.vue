<template>
  <v-container>
    <v-file-input
      multiple
      label="load video or image"
      accept="image/*, video/*"
      @change="loadFile"></v-file-input>
    <!-- <v-img v-if="file" src="../assets/logo.png"></v-img> -->
    <v-img :src="imageSrc" contain height="500"></v-img>
    <!-- <v-btn color="primary" @click="getNewImg">Process</v-btn> -->
    <div v-for="(slider, idx) in sliders" :key="idx">
      <v-subheader>{{ slider.name }}</v-subheader>
      <v-row>
        <v-col class="px-4">
          <v-range-slider
            v-model="slider.range"
            :min="slider.min"
            :max="slider.max"
            hide-details
            class="align-center"
            @change="getResult(slider)"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="slider.range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(slider.range, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="slider.range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(slider.range, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// import { ipcRenderer } from 'electron';
// const { ipcRenderer } = window.require('electron');

export default {
  // name: 'HelloWorld',

  data: () => ({
    // data members
    sliders: [
      {
        name: "hue",
        min: 0,
        max: 179,
        range: [50, 60],
      },
      {
        name: "saturation",
        min: 0,
        max: 255,
        range: [200, 255],
      },
      {
        name: "value",
        min: 0,
        max: 255,
        range: [127, 255],
      },
    ],
    file: null,
    imageSrc: '',
  }),
  methods: {
    loadFile: async function (files) {
      this.file = files[0];
      const data = await window.ipcRenderer.invoke('file-selected', this.file.path);
      // console.log(data);
      // const buf = Buffer.from(data).toString('base64');
      // this.imageSrc = `data:image/png;base64,${buf}`;
      // get filename
      // filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
      this.imageSrc = URL.createObjectURL(new Blob([data], { type: 'image/png' }));
    },
    getResult: async function (slider) {
      // this.$set(rng, 0, this.$event);
      console.log('range of '+ slider.name +' changed to '+ slider.range);
      const result_img = await window.ipcRenderer.invoke("boundary-changed", slider);

      this.imageSrc = URL.createObjectURL(new Blob([result_img], { type: 'image/png' }));
      // this.$set(this, 'imageSrc', URL.createObjectURL(new Blob([result_img], { type: 'image/png' })));
    },
    // getNewImg: async function () {
    //   const result_img = await window.ipcRenderer.invoke("boundary-changed", { name: '' });
    //   this.imageSrc = URL.createObjectURL(new Blob([result_img], { type: 'image/png' }));
    // }
  },
  // mounted: () => {
  //   console.log('mounted');
  //   window.ipcRenderer.on("boundary-updated", (event, ok) => {
  //     console.log("checked: "+ ok);
  //   });
  // },
};
</script>
