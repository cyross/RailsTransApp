class CreateTranslations < ActiveRecord::Migration[6.0]
  def change
    create_table :translations do |t|
      t.string :source
      t.string :translated

      t.timestamps
    end
  end
end
