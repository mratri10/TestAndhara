import * as React from 'react';
import {useController} from 'react-hook-form';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TypeInput} from '../../screen/root';
import RangeDate from '../rangeDate';
import IconF from 'react-native-vector-icons/FontAwesome5';

function InputApp(value: VInput) {
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const {field, fieldState} = useController({
    control: value.control,
    defaultValue: value.defaultValue,
    name: value.name,
  });

  const onModal = () => {
    setIsModal(!isModal);
  };

  const SwithInput = () => {
    switch (value.type) {
      case TypeInput.EMAIL:
        return (
          <TextInput
            keyboardType="email-address"
            style={[styleInput.input]}
            value={field.value}
            onChangeText={field.onChange}
            placeholder={value.title}
            ref={field.ref}
          />
        );
      case TypeInput.NUMBER:
        return (
          <TextInput
            keyboardType="number-pad"
            style={[styleInput.input]}
            value={field.value}
            onChangeText={field.onChange}
            placeholder={value.title}
            ref={field.ref}
          />
        );
      case TypeInput.CHECKBOX_HORIZONTAL:
        return (
          <View style={styleInput.ch}>
            {value.chList?.map(item => {
              return (
                <TouchableOpacity
                  style={styleInput.chView}
                  key={item.id}
                  onPress={() => field.onChange(() => item.id.toString())}>
                  <View>
                    <Text style={styleInput.chTitle}>{item.value}</Text>
                  </View>
                  <View style={styleInput.chCircle}>
                    <View
                      style={
                        item.id == parseInt(field.value)
                          ? styleInput.chSelected
                          : styleInput.chDeselected
                      }
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      case TypeInput.DATERANGE:
        const data: TypeRange = field.value;
        const tp: Date = data.date;
        return (
          <DateView
            onPress={onModal}
            title={value.title}
            dateA={tp}
            dateB={
              new Date(
                tp?.getFullYear(),
                tp?.getMonth(),
                tp?.getDate() + data.range + 1,
              )
            }
          />
        );
      default:
        return (
          <TextInput
            style={[styleInput.input]}
            value={field.value}
            onChangeText={field.onChange}
            placeholder={value.title}
            ref={field.ref}
          />
        );
    }
  };

  return (
    <View>
      {value.isTitle ? (
        field.value ? (
          <Text style={styleInput.title}>{value.title}</Text>
        ) : null
      ) : null}

      <View style={[styleInput.view]}>{SwithInput()}</View>
      {fieldState.error ? (
        <Text style={styleInput.textError}>* {fieldState.error.message}</Text>
      ) : null}

      <ModalView
        visible={isModal}
        onPress={onModal}
        onChangeDate={v => {
          field.onChange(() => v);
        }}
      />
    </View>
  );
}

const DateView = ({onPress, title, dateA, dateB}: DateValue) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress}>
        {dateA != undefined ? (
          <Text>
            {dateA?.toLocaleDateString() + ' - ' + dateB.toLocaleDateString()}
          </Text>
        ) : (
          <Text>Masukan {title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const ModalView = ({visible, onPress, onChangeDate}: ModalValue) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styleInput.movalstyle}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            position: 'absolute',
            top: 30,
            right: 30,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
            borderRadius: 20,
          }}>
          <IconF name="times" size={16} color="white" />
        </TouchableOpacity>
        <RangeDate onPressDate={onChangeDate} />
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Pilih</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styleInput = StyleSheet.create({
  view: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  title: {
    fontSize: 10,
    fontWeight: '600',
  },
  input: {
    paddingVertical: 2,
  },
  textError: {
    color: 'red',
    fontSize: 11,
    fontWeight: '600',
  },
  ch: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chView: {flexDirection: 'row', alignItems: 'center', marginRight: 10},
  chCircle: {
    borderWidth: 1,
    borderRadius: 5,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chSelected: {
    backgroundColor: 'blue',
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  chDeselected: {
    backgroundColor: 'white',
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  chTitle: {
    fontSize: 12,
    marginRight: 4,
  },
  movalstyle: {
    backgroundColor: 'rgba(200,200,200,0.8)',
    padding: 20,
    flex: 1,
  },
});

export default InputApp;
