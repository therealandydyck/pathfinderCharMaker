import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  itemStyle: {
    borderWidth: 2,
    borderStyle: 'solid',
    borerColor: 'black',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 15,
    padding: 5,
  },
  itemText: {
    fontSize: 18,
  },
  listArea: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    flex: 1,
    marginBottom: 10,
    minWidth: '100%',
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  input: {
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
});