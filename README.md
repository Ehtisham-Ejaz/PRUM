# PRUM

**************************INSTALLATION***************************

1. Install WSL2 with ubuntu 22.04
2. Install Latest Nvidia Graphics Drivers in windows host
3. Install Cuda
     a. wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-wsl-ubuntu.pin
     b. sudo mv cuda-wsl-ubuntu.pin /etc/apt/preferences.d/cuda-repository-pin-600
     c. wget https://developer.download.nvidia.com/compute/cuda/12.2.2/local_installers/cuda-repo-wsl-ubuntu-12-2-local_12.2.2-1_amd64.deb
     d. sudo dpkg -i cuda-repo-wsl-ubuntu-12-2-local_12.2.2-1_amd64.deb
     e. sudo cp /var/cuda-repo-wsl-ubuntu-12-2-local/cuda-*-keyring.gpg /usr/share/keyrings/
     f. sudo apt-get update
     g. sudo apt-get -y install cuda
4. git clone https://github.com/Ehtisham-Ejaz/PRUM.git
5. Install Node in wsl2
     a. sudo apt-get install curl
     b. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
     c. nvm --version (to check version)
     d. nvm install --lts (For installation of node)
     e. node --version (to check version)
     f. npm --version (to check version)

6. cd PRUM/frontend
     a. npm install --force
     b. npm start

7. cd PRUM/frontend/backend
     a. npm install --force
     b. npm start

8. install mitre
     a. git clone https://github.com/mitre-attack/attack-navigator.git
     b. cd nav-app
     c. npm install --legacy-peer-deps
     d. npm start 
     
     ==> If found any node error "Error message "error:0308010C:digital envelope routines" then run;
     e. export NODE_OPTIONS=--openssl-legacy-provider
     f. npm start

9. install mongodb
     a. cd /
     b. sudo apt-get install gnupg
     c. curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
     d. echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
     e. sudo apt-get update
     f. sudo apt-get install -y mongodb-org
     g. sudo mkdir -p data/db
     h. sudo chown -R `id -un` data/db
     i. mongod (to start mongodb)
     j. mongoimport --db practice --collection modelData --file file_path --jsonArray

10. install python 3.10.12

11. install Python Libraries
     a. pip install --extra-index-url=https://pypi.nvidia.com cudf-cu12 cuml-cu12
     b. pip install sentence-transformers
     c. pip install flask
     d. pip install pymodm 
     e. pip install pymongo
     f. pip install Flask-Cors
     g. pip install numpy
     h. pip install pandas
     i. pip install pickle
     j. pip install elasticsearch

12. install anaconda with python 3.11 (For Supervised)
     a. conda create --name supervised python=3.11
     b. conda activate supervised
     c. conda install -c conda-forge cudatoolkit=11.8.0
     d. pip install nvidia-cudnn-cu11==8.6.0.163
     e. CUDNN_PATH=$(dirname $(python -c "import nvidia.cudnn;print(nvidia.cudnn.__file__)"))
     f. export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$CUDNN_PATH/lib:$CONDA_PREFIX/lib/
     g. mkdir -p $CONDA_PREFIX/etc/conda/activate.d
     h. echo 'CUDNN_PATH=$(dirname $(python -c "import nvidia.cudnn;print(nvidia.cudnn.__file__)"))' >> $CONDA_PREFIX/etc/conda/activate.d/env_vars.sh
     i. echo 'export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$CUDNN_PATH/lib:$CONDA_PREFIX/lib/' >> $CONDA_PREFIX/etc/conda/activate.d/env_vars.sh
     j. pip install --upgrade pip
     k. pip install tensorflow==2.13.*
     l. python3 -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))" (to verify if tensorflow is using gpu or not)
