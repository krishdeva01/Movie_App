from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'email': _('A user with this email already exists.')})
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email is None or password is None:
            raise serializers.ValidationError(_('Both email and password are required.'))

        try:user = User.objects.get(email=email)
        except User.DoesNotExist: raise serializers.ValidationError(_('Invalid email or password.'))

        if not user.check_password(password):
            raise serializers.ValidationError(_('Invalid email or password.'))

        attrs['user'] = user
        return attrs
