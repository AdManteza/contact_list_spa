# Homepage (Root path)

get '/' do
  erb :index
end

get "/contacts" do
  content_type :json
  Contact.all.to_json
end

get "/contacts/:searchQuery" do
  content_type :json
  @contacts = Contact.where("firstname LIKE ? OR lastname LIKE ? OR email LIKE ?", "%#{params[:searchQuery]}%","%#{params[:searchQuery]}%","%#{params[:searchQuery]}%")
  @contacts.to_json
end

post "/contacts/new" do
  content_type :json
  @contact = Contact.create(firstname: params[:firstName], lastname: params[:lastName], email: params[:email])
  @contact.to_json
end

delete "/contacts/:id" do
  content_type :json
  @contact = Contact.find params[:id]
  @contact.destroy.to_json
end


