const login = { 
    result: 'ok', 
    data: { 
      token: 'mock_token', 
      user: { 
        id: 'mock_user_id', 
        login: 'mock_login', 
        balance: 1000, 
      } 
    } 
  };
  
  const signUp = { 
    result: 'ok', 
    data: { 
      token: 'mock_token', 
      user: { 
        id: 'mock_user_id', 
        signUp: 'mock_signUp', 
        balance: 1000, 
      } 
    } 
  };
  const sendMessage = { 
    data: { 
      token: 'mock_token', 
      message: { 
        sendMessage: 'mock_sendMessage', 
      } 
    } 
  };
  
  const addGamers = { 
    data: { 
      name: { 
        id: 'mock_user_id',
        id_person: 'mock_person_id', 
        addGamers: 'mock_addGamers',  
      } 
    } 
  };
  const addFriend = { 
    data: { 
      name: { 
        id: 'mock_name_id', 
        addFriend: 'mock_addFriend', 

      } 
    } 
  };
  
  const updatePersonId = { 
    result: 'ok', 
    data: { 
      token: 'mock_token', 
      user: { 
        id: 'mock_user_id', 
        updatePersonId: 'mock_updatePersonId', 
        balance: 1000, 

      } 
    } 
  };
  const moveMobs = { 
    data: { 
      mobs: { 
        id: 'mock_mobs_id', 
        moveMobs: 'mock_moveMobs', 
        balance: 1000, 
      } 
    } 
  };
  
  const addInvitation = { 
    data: { 
      token: 'mock_token', 
      lobbyName: { 
        id: 'mock_friends_id', 
        addInvitation: 'mock_addInvitation', 
      } 
    } 
  };
  const checkInvites = {
    data: { 
      token: 'mock_token', 
      lobbyName: { 
        id: 'mock_friends_id', 
        checkInvites: 'mock_checkInvites', 
      } 
    } 
  };
  
  const updateHp = { 
    data: { 
      gamerName: { 
        id: 'mock_usergamerName_id', 
        updateHp: 'mock_updateHp', 
      } 
    } 
  };

  export default { 
    signUp, 
    login,
    sendMessage,
    addFriend,
    addGamers,
    updatePersonId,
    moveMobs,
    addInvitation,
    checkInvites,
    updateHp
  };