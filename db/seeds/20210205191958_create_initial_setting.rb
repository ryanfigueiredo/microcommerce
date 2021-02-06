puts "creating initial setting..."
  setting = Setting.create!
  setting.logo.attach(
    io: File.open("/home/ryanfigueiredo/Documentos/dev/hortifrutidakelly/app/assets/images/logo.jpg"),
    filename: 'logo.jpg',
    content_type: 'image/jpg',
    identify: false
  )
  setting.save!
puts "initial setup successfully created"
