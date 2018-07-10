# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

PASSWORD = "secret" 

Comment.delete_all
Post.delete_all
User.delete_all

super_user = User.create(
    first_name: "Erika",
    last_name: "Balbino",
    email: "erika.balbino@example.com",
    password: PASSWORD
)

10.times do 
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name

    User.create(
        first_name: first_name,
        last_name: last_name,
        email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
        password: PASSWORD
    )
end

users = User.all

puts Cowsay.say "Created #{users.count} users", :sheep

50.times do
    p = Post.create(
        title: Faker::Book.title,
        body: Faker::Lorem.paragraph(2, true),
        user: users.sample
    )
    if p.valid?
        rand(0..5).times do
            Comment.create(
                body: Faker::Matz.quote,
                post: p,
                user: users.sample
            )
        end
    end

end



posts = Post.all
comments = Comment.all

puts Cowsay.say "Created #{posts.count} posts", :cow
puts Cowsay.say "Created #{comments.count} comments", :tux
puts 
"Login with #{super_user.email} and password #{PASSWORD}"