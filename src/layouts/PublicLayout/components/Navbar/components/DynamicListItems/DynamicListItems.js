import React, { useEffect, useState } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Text } from "../../../../../../components";
import Collapse from '@material-ui/core/Collapse';
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import LabelIcon from '@material-ui/icons/Label';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingTop: theme.spacing(0),
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(0),
    },
    itemicon: {
        minWidth: '34px !important'
    }
}));


const DynamicListItems = (props) => {
    const classes = useStyles();
    const [renderListItems, setRenderListItems] = useState([]);
    useEffect(async () => {
        await setRenderListItems(props.itemsData);
        await setDefaultActiveItem();
    }, []);

    const setDefaultActiveItem = () => {
        let element = document.querySelector(`${'#dashboard'}`);
        element.classList.add('border-blue-700', 'border-l-4', 'bg-blue-50');
    }

    const activePanel = (item) => {
        let listItems = document.getElementById('drawer-item-container');
        let element = document.querySelector(`${'#' + item}`);

        listItems.childNodes.forEach((el, index) => {
            el.classList.remove('border-blue-700', 'border-l-4', 'bg-blue-50');
            el.classList.add('border-white', 'border-l-4', 'bg-white', 'hover:border-blue-700', 'border-l-4', 'hover:bg-blue-50');
        })
        element.classList.add('border-blue-700', 'border-l-4', 'bg-blue-50');
        // handleDrawerOpen();
    };
    const handleListItem = (item, itemroute) => {
        if (!!itemroute) {
            props.history.push(itemroute);
        } else {
            renderListItems.map((el_list, index) => {
                if (el_list.id === item.id && item.isexpanded) {
                    el_list.isexpanded = false;
                } else if (el_list.id === item.id && !item.isexpanded) {
                    el_list.isexpanded = true;
                }
            });
            setRenderListItems([...renderListItems]);
        }
    }

    return (
        <React.Fragment>
            {
                renderListItems.map((el, index) => {
                    return (
                        <React.Fragment>
                            <div
                                key={index}
                                id={el.id}
                                onClick={() => activePanel(el.id)}
                                className='border-white border-l-4 bg-white hover:border-blue-700 border-l-4 hover:bg-blue-50'
                            >
                                <ListItem button onClick={() => handleListItem(el, el.route)}>
                                    <ListItemIcon className={classes.itemicon}>
                                        <div className="bg-indigo-100 p-2 rounded -mx-3 sm:-mx-2">
                                            <div dangerouslySetInnerHTML={{ __html: el.itemicon }}></div>
                                        </div>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Text
                                            classes="capitalize"
                                            size="sm"
                                            weight="700"
                                            variant="infoDark"
                                        >
                                            {el.itemname}
                                        </Text>
                                    </ListItemText>
                                    {el.hasdropdown ? el.isexpanded ? <div><ExpandMore /></div> : <div><ExpandLess /></div> : null}
                                </ListItem>
                            </div>
                            {
                                el.hasdropdown ?
                                    <Collapse in={el.isexpanded} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                                el.subitemlist.map((sub_el, sub_index) => {
                                                    return (
                                                        <ListItem key={sub_index} button className={classes.nested} onClick={() => handleListItem(el, sub_el.route)}>
                                                            <ListItemIcon className={classes.itemicon}>
                                                                <div className="bg-indigo-100 p-0 rounded ">
                                                                    <LabelIcon
                                                                        className='text-green-700'
                                                                    />
                                                                </div>
                                                            </ListItemIcon>
                                                            <ListItemText>
                                                                <Text
                                                                    classes="capitalize"
                                                                    size="xs"
                                                                    weight="800"
                                                                    variant="black"
                                                                >
                                                                    {sub_el.item}
                                                                </Text>
                                                            </ListItemText>
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                        </List>
                                    </Collapse>
                                    : null
                            }

                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
    )
}

export default withRouter(DynamicListItems);