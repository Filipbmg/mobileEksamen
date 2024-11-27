import { FlatList } from "react-native-web";

const notes = [
    {id: 1, name: "pu"},
    {id: 2, name: "pu"},
    {id: 3, name: "pu"},
]

<View>
    <FlatList
        data={notes}
        renderItem={(note) => <Text>{notes.item.name}</Text>}
    />
<View/>