require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

require("jquery")
require('popper.js')
require("bootstrap/dist/js/bootstrap.bundle")
require("jquery.easing/jquery.easing")
require('@fortawesome/fontawesome-free/js/all')
require('imports-loader?define=>false!datatables.net')(window, $)
require('imports-loader?define=>false!datatables.net-bs4')(window, $)
require('./shared/sb-admin-2')

// Examples
require("chartkick")
require("chart.js")

require('./shared/demo/chart-area-demo')
require('./shared/demo/chart-bar-demo')
require('./shared/demo/chart-pie-demo')

require('./shared/form')
