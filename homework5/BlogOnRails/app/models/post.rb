class Post < ApplicationRecord

    validates(:title, presence: true, uniqueness: true)

    validates(
        :body, 
        present: true,
        length: {
            minimum: 50
        })

    before_validation :set_default_title
    private

    def set_default_title

        self.title = self.title.capitalize

    end
end
