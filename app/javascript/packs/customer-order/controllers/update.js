$(document).on('turbolinks:load', function() {
  updateStatusCustomerOrder()
})

var updateStatusCustomerOrder = () => {
  $('.dropdown-item')
    .on('ajax:complete',toggleElementsDropdownStatus )
    .on('ajax:error',toggleElementsDropdownStatus )
}

var toggleElementsDropdownStatus = (event) => {
  let elementIconStatus = $(event.target).parent().siblings().children().children('svg')
  let iconStatusClass = elementIconStatus.attr('class')
  let elementTextStatus = $(event.target).parent().siblings().children().children('span')
  let textStatus = elementTextStatus.text()
  let path = $(elementTextStatus).data('path')

  let elementSelectedIconStatus = $(event.target).children('svg')
  let selectedIconStatusClass = elementSelectedIconStatus.attr('class')
  let elementSelectedTextStatus = $(event.target).children('span')
  let selectedTextStatus = elementSelectedTextStatus.text()
  let selectedPath = event.target.href

  elementIconStatus.removeClass().addClass(selectedIconStatusClass)
  elementSelectedIconStatus.removeClass().addClass(iconStatusClass)

  elementTextStatus.text(selectedTextStatus)
  elementSelectedTextStatus.text(textStatus)

  event.target.ref = path
  $(elementTextStatus).data('path', selectedPath)
}
