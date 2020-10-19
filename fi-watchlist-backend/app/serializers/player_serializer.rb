class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :team, :cost
end
