class PlayerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :team, :cost
end
