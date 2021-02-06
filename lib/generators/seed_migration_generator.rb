class SeedMigrationGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  def generate_seed_migration
    time_stamp = Time.now.strftime("%Y%m%d%H%M%S")
    text_helper = "# place your seed here so that it is provided in the order of the timestamp"
    seeds_path = File.expand_path("db/seeds")

    empty_directory seeds_path unless File.directory?(seeds_path)
    create_file "db/seeds/#{time_stamp}_#{file_name}.rb", text_helper
  end
end
