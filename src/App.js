import React, {useEffect, useRef, useState} from 'react'
import { Amplify, API, Storage } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: "apiAws",
        endpoint: "https://vcslefq9g1.execute-api.us-east-1.amazonaws.com/dev",
        region: "us-east-1",
      },
    ],
  },
  Storage: {
    region: "us-east-1",
    bucket: "tp2awsfilebucket22159-dev"
  },
});

const App = ({ signOut, user }) => {
  const mounted = useRef(false);
  const [resources, setResources] = useState(null);
  const [itemLink, setItemLink] = useState(null);
  const [items, setItems] = useState([]);
  const [itemFormLoaded, setItemFormLoaded] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState(true);

  const sendForm = async (e) => {
    e.preventDefault();
    if (!e.target.file?.files?.length) {
      alert('Vous devez selectionner un fichier.')
      return;
    }

    try {
      if (!itemFormLoaded) {
        setItemFormLoaded(true);
        let file = e.target.file.files[0];
        let newItem = await Storage.put('files/' + (new Date()).getTime() + '-' + file.name, file, {
          contentType: file.type,
          metadata: {
            key: file.name
          }
        });

        e.target.file.value = null;
        e.target.file.files = null;
        setItemLink(null);
        setItems([...items, newItem]);
        setTimeout(() => setItemFormLoaded(false), 2000);
      }
    } catch (error) {
      console.error('Error saving Storage item:', error);
    }
  }

  const toggleResetBtn = () => {
    setItemLink(null);
  }

  const uploadFile = (e) => {
    let file = e.target?.files;
    let imageElement = document.getElementById('fileInput');
    if (file && file[0] && imageElement) {
      imageElement.src = URL.createObjectURL(file[0]);
      setItemLink(e.target.value);
    }
  }

  const deleteImage = async (id) => {
    try {
      let item = items[id];
      await Storage.remove(item.key);
      setItems(items.filter((item, index) => index !== id));
    } catch (error) {
      console.error('Error deleting Storage item:', error);
    }
  }

  const sendNotificationForm = (e) => {
    e.preventDefault();
    console.log('e.target')
    console.log(e.target)
  }

  const fetchApiData = async () => {
    try {
      const response = await API.get('apiAws', '/resources', {});
      // Storage.put('')
      console.log('Resource response', response);
      setResources(response);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  const fetchApiItems = async () => {
    try {
      const response = await Storage.list('files/', { pageSize: 'ALL' });
      console.log('Storage list response', response.results);
      setItems(response.results);
    } catch (error) {
      console.error('Error fetching Storage items:', error);
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      Promise.all([
        fetchApiData(),
        fetchApiItems(),
      ]).then();
    }
  }, []);

  useEffect(() => {
    setItemsLoaded(true);
    setTimeout(() => setItemsLoaded(false), 2000);
  }, [items]);

  const renderImagesList = () => {
    let renderList = [
      (<div key="items" className="p-2 my-2 bg-amber-400 text-white">Liste vide</div>)
    ];

    const itemListLength = items.length;

    if (itemListLength) {
      renderList = [];

      for (let i = 0; i < itemListLength; i++) {
        renderList.push(
          <div key={i} className="flex justify-between shadow-lg mb-2 px-2 py-3 rounded-md border">
          <span>
            {(items[i].name ?? items[i].key).replace('files/', '')}
          </span>
            <button type="button" onClick={() => deleteImage(i)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        );
      }
    }

    return <>{renderList}</>;
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center text-white">
                {user.attributes.email}
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button onClick={signOut} type="button" className="relative p-1 text-gray-400 hover:text-white">
                Sign out
              </button>

              <div className="relative ml-3">
                <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-2 gap-5 p-2 sm:p-4">
        <div className="flex flex-col">
          <div className="mb-4">
            <button onClick={fetchApiData} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-5 rounded-lg transition ease-in-out duration-300 text-xl">
              Recharger les données de l'API
            </button>
          </div>
          <div className="flex">
            <div className="flex items-center w-1/4">
              <h2>Résultat de l'appel API</h2>
            </div>
            <div className="overflow-x-auto code bg-gray-200">
              {resources && (
                <div>
                  <pre>{JSON.stringify(resources, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="font-bold text-xl mb-5">
              Ajouter un fichier a votre stockage Cloud
            </h2>
            <form onSubmit={sendForm} onReset={toggleResetBtn} encType="multipart/form-data">
              <div className={itemLink === null ? 'hidden' : 'w-full py-3'}>
                <img src="#" id="fileInput" alt="Preview" className="h-32" />
              </div>
              <div className="flex py-3 items-center">
                <div className="flex items-center">
                  <label htmlFor="file" className="bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-2 rounded-md cursor-pointer transition ease-in-out duration-300 mr-3">
                    Choisir un fichier
                    <input type="file" id="file" name="file" placeholder="Choisir un fichier" className="hidden" onChange={uploadFile}/>
                  </label>

                  <button type="reset" className={itemLink === null ? 'hidden' : 'mr-5'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>

                <div>
                  <button type="submit" disabled={itemFormLoaded} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-md transition ease-in-out duration-300 disabled:bg-red-200">
                    Telecharger
                    {itemFormLoaded ? ' (Loaded...)' : ''}
                  </button>
                </div>
              </div>
            </form>
            <div className="flex flex-col">
              {itemsLoaded ? (<>Loaded...</>) : renderImagesList()}
            </div>
          </div>
          <div className="my-3">
            <h2 className="font-bold text-xl mb-5">
              Envoyer une notification
            </h2>
            <div className="bg-gray-300 p-4 rounded-md">
              <form className="flex flex-col justify-center" onSubmit={sendNotificationForm}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Destinataire
                    <span>
                    (email)
                  </span>
                  </label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                         type="email" id="email" name="email" placeholder="dyos98@gmail.com"/>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                    Contenu du mail
                  </label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="content" name="content" placeholder="Bonjour le monde" minLength={4}></textarea>
                </div>

                <button type="submit" className="md:w-32 bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg mt-3 transition ease-in-out duration-300">
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthenticator(App);
