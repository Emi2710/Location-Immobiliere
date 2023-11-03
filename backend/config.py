import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Define functions to get configuration values
def get_db_name():
    return os.environ.get('DB_NAME')

def get_db_user():
    return os.environ.get('DB_USER')

def get_db_password():
    return os.environ.get('DB_PASSWORD')

def get_db_host():
    return os.environ.get('DB_HOST')
