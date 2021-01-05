$( document ).on('turbolinks:load', function() {
  handleInputFileChange()
})

var handleInputFileChange = () => {
  $('.custom-file-input').change(function() {
    let filename = this.files.length ? this.files[0].name : 'Escolher arquivo'
    $(this).siblings().text(filename)
  })
}
