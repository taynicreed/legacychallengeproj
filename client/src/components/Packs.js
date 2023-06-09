// https://reactjssnippet.com/posts/how-to-check-all-checkbox-in-react-js/
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

export default function PackList({ onPackSelection }) {
    const [expansionPacks, setExpansionPacks] = useState([]);
    const [gamePacks, setGamePacks] = useState([]); 
    const [stuffPacks, setStuffPacks] = useState([]);
    const [kits, setKits] = useState([]);

  // get packs from database
  useEffect(() => {
    Axios.get('/api2/packs').then((response) => {
      const data = response.data;

      // filters packs by type before mapping
      const expansionPacksData = data.filter(pack => pack.packType === 'Expansion');
      const gamePacksData = data.filter(pack => pack.packType === 'Game');
      const stuffPacksData = data.filter(pack => pack.packType === 'Stuff'); 
      const kitsData = data.filter(pack => pack.packType === 'Kit');    
  
      // map packs to appropriate arrays
      setExpansionPacks(expansionPacksData.map(pack => ({
        id: pack.packID,
        packName: pack.packName,
        type: pack.packType,
        checked: pack.selected
      })));

      setGamePacks(gamePacksData.map(pack => ({
        id: pack.packID,
        packName: pack.packName,
        type: pack.packType,
        checked: pack.selected
      })));
  
      setStuffPacks(stuffPacksData.map(pack => ({
        id: pack.packID,
        packName: pack.packName,
        type: pack.packType,
        checked: pack.selected
      })));
  
      setKits(kitsData.map(pack => ({
        id: pack.packID,
        packName: pack.packName,
        type: pack.packType,
        checked: pack.selected
      })));
  });
}, []);


  // Action of select all button
  const selectAll = () => {
    const changeAll = expansionPacks.map((checkbox) => ({
      ...checkbox, checked: true,
    }));

    const changeAll2 = gamePacks.map((checkbox) => ({
      ...checkbox, checked: true,
    }));

    const changeAll3 = stuffPacks.map((checkbox) => ({
      ...checkbox, checked: true,
    }));

    const changeAll4 = kits.map((checkbox) => ({
      ...checkbox, checked: true,
    }));

    setExpansionPacks(changeAll);
    setGamePacks(changeAll2);
    setStuffPacks(changeAll3);
    setKits(changeAll4);
  };
  
  // Action of deselect all button
  const deselectAll = () => {
    const changeAll = expansionPacks.map((checkbox) => ({
      ...checkbox, checked: false,
    }));
    
    const changeAll2 = gamePacks.map((checkbox) => ({
      ...checkbox, checked: false,
    }));

    const changeAll3 = stuffPacks.map((checkbox) => ({
      ...checkbox, checked: false,
    }));

    const changeAll4 = kits.map((checkbox) => ({
      ...checkbox, checked: false,
    }));
    
    setExpansionPacks(changeAll);
    setGamePacks(changeAll2);
    setStuffPacks(changeAll3);
    setKits(changeAll4);
  };

  // Action of individual checkbox
  const handleChange = (checkboxID, packCategory) => {
    switch (packCategory) {
      case 'expansionPacks':
        setExpansionPacks((prevState) =>
          prevState.map((checkbox) =>
            checkbox.id === checkboxID ? { ...checkbox, checked: checkbox.checked ? 0 : 1 } : checkbox
          ));
        break;
      case 'gamePacks':
        setGamePacks((prevState) =>
          prevState.map((checkbox) =>
            checkbox.id === checkboxID ? { ...checkbox, checked: checkbox.checked ? 0 : 1 } : checkbox
          ));
        break;
      case 'stuffPacks':
        setStuffPacks((prevState) =>
          prevState.map((checkbox) =>
            checkbox.id === checkboxID ? { ...checkbox, checked: checkbox.checked ? 0 : 1 } : checkbox
          ));
        break;
      case 'kits':
        setKits((prevState) =>
          prevState.map((checkbox) =>
            checkbox.id === checkboxID ? { ...checkbox, checked: checkbox.checked ? 0 : 1 } : checkbox
          ));
        break;
      default:
        break;
  }};

    // Update database with new pack selections on submit
    const handleSelectionSubmit = () => {
      const packsToUpdate = [...expansionPacks, ...gamePacks, ...stuffPacks, ...kits];
      const updatedPacks = packsToUpdate.map((pack) => ({
        packID: pack.id,
        selected: pack.checked,
      }));

      // Call the onPackSelection prop with the updatedPacks
      onPackSelection(updatedPacks);
    };

    return (
      <>
      <div className="two-btn">
        <Button variant="success" onClick={() => selectAll()}>Select all</Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="secondary" onClick={() => deselectAll()}>Deselect All</Button>
      </div>
      <div className="container">
        <div>
          <label><strong>Expansion Packs</strong><br/></label>
          {expansionPacks.map((checkbox) => (
            <label key={checkbox.id}>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleChange(checkbox.id, 'expansionPacks')}
              />
              {checkbox.packName}
            </label>
          ))}
          <br />
        </div>
  
        <div>
          <label><strong>Game Packs</strong><br/></label>
          {gamePacks.map((checkbox) => (
            <label key={checkbox.id}>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleChange(checkbox.id, 'gamePacks')}
              />
              {checkbox.packName}
              <br />
            </label>
          ))}
        </div>
  
        <div>
          <label><strong>Stuff Packs</strong><br/></label>
          {stuffPacks.map((checkbox) => (
            <label key={checkbox.id}>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleChange(checkbox.id, 'stuffPacks')}
              />
              {checkbox.packName}
              <br />
            </label>
          ))}
        </div>
  
        <div>
          <label><strong>Kit Packs<br/></strong></label>
          {kits.map((checkbox) => (
            <label key={checkbox.id}>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleChange(checkbox.id, 'kits')}
              />
              {checkbox.packName}
              <br />
            </label>
          ))}
          <br />
        </div>
      </div>
      
        <div className="two-btn">
        <Link to="/">
            <Button variant="success" onClick={handleSelectionSubmit}>Apply</Button>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link to="/">
            <Button variant="secondary">Cancel</Button>
        </Link>
        </div>
        <h3>
          After applying changes please use the "Generate Rule" button on the home page to get updated challenge rules.
          <br></br>
          <br></br>
        </h3>

      </>

    );
  }