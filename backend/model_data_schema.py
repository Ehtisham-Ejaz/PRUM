from pymodm import MongoModel, fields


class ModelData(MongoModel):
    user = fields.CharField(required=True)
    list_to_be_return = fields.DictField(required=True)

    class Meta:
        collection_name = 'modelData'

    @classmethod
    def add_data(cls, user, list_to_be_return):
        try:
            existing_data = cls.objects.raw({'user': user}).first()
            if existing_data:
                # Update the existing document
                existing_data.list_to_be_return = list_to_be_return
                existing_data.save()

        except cls.DoesNotExist:
            model_data = ModelData(user=user, list_to_be_return=list_to_be_return)
            model_data.save()

    @classmethod
    def check_user(cls, user):
        check_user = False
        try:
            user_obj = cls.objects.raw({'user': user}).first()

            if user_obj:
                print(f"User '{user}'s' model results already exists in the database")
                check_user = True

            return check_user

        except cls.DoesNotExist:
            return check_user

    @classmethod
    def get_all_users(cls):
        user_not_found = False
        try:
            all_users = cls.objects.all()
            return [user.to_son().to_dict() for user in all_users]
        except cls.DoesNotExist:
            return user_not_found

    @classmethod
    def find_user(cls, user):
        try:
            user_data = cls.objects.get({'user': user})

            return user_data

        except cls.DoesNotExist:
            print('User Does not Exist')
