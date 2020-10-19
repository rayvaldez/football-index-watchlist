class PlayerSerializer < ActiveModel::Serializer
  attributes :name, :team, :cost
end
