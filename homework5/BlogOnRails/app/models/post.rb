class Post < ApplicationRecord

    belongs_to :user
    
    has_many :comments, dependent: :destroy

    validates(:title, presence: true, uniqueness: true)

    validates(
        :body, 
        presence: true,
        length: {
            minimum: 50
        })

    before_validation :set_default_title

    private
    def set_default_title

        self.title = self.title.capitalize

    end
end
