require 'faker'

20.times {
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  contact = Contact.create(
  :firstname => first_name,
  :lastname => last_name,
  :email => Faker::Internet.email(first_name + "." + last_name)
  )
}
