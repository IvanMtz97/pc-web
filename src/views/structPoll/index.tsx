import * as React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Row,
  Upload,
} from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import Input from '../../components/Input';
import Select, { SelectOption } from '../../components/Select';
import structs from '../../data/structs.json';
import { useStruct } from '../../hooks/struct';
import {
  isCurpValid,
  isDayValid,
  isHabitantElectorKeyValid,
  isLeaderElectorKeyValid,
  isNotNull,
  isNumberNotNull,
  isZipCodeValid,
} from '../../utils/validations';

function StructPoll() {
  const {
    birthDate,
    colonies,
    handleDateChange,
    handleInputChange,
    handleSelectChange,
    setStruct,
    struct,
  } = useStruct();

  function mapOptions(data: any): SelectOption[] {
    return data.map((item: SelectOption): SelectOption => ({ value: item.value, label: item.label }));
  }

  function handleVinculatedCheckbox(data: boolean) {
    setStruct({
      ...struct,
      IsVinculated: data,
    });
  }

  function handleIneAddressCheckbox(data: boolean) {
    setStruct({
      ...struct,
      IneEqualsLivingPlace: data,
    });
  }

  function handleHasInternetCheckbox(data: boolean) {
    setStruct({
      ...struct,
      LivingPlaceHasInternet: data,
    });
  }

  function renderStructInfoField(): React.ReactNode | null {
    if (struct?.IsVinculated) {
      return (
        <Row>
          <Col xs={24} lg={24}>
            <Input
              allMayus
              id="LeaderElectorKey"
              label="Clave de elector de lider*"
              onChange={handleInputChange}
              validation={isLeaderElectorKeyValid}
              value={struct.LeaderElectorKey}
            />
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        <Col xs={24} lg={24}>
          <Select
            id="Struct"
            label="Estructura*"
            onChange={handleSelectChange}
            options={mapOptions(structs)}
            value={struct?.Struct}
          />
        </Col>
      </Row>
    );
  }

  function renderIneAddressField(): React.ReactNode | null {
    if (!struct.IneEqualsLivingPlace) {
      return (
        <Row>
          <Col xs={24} lg={24}>
            <Input
              allowEmpty
              id="LivingPlaceAddress"
              label="Especifique dirección de vivienda"
              onChange={handleInputChange}
              value={struct.LivingPlaceAddress}
            />
          </Col>
        </Row>
      );
    }

    return null;
  }

  return (
    <div
      className="screen-container"
      data-cy="sweeps-poll-container"
    >
      <Card
        className="form-card"
        title="Encuesta de liderazgo"
      >
        <label>¿Está vinculado?</label>

        <Row>
          <Col lg={1}>
            <Checkbox
              checked={struct?.IsVinculated}
              data-testid="IsVinculated-checkbox"
              onClick={() => handleVinculatedCheckbox(true)}
            >
                Si
            </Checkbox>
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={!struct?.IsVinculated}
              data-testid="IsNotVinculated-checkbox"
              onClick={() => handleVinculatedCheckbox(false)}
            >
              No
            </Checkbox>
          </Col>
        </Row>

        <br />

        {renderStructInfoField()}

        <br />

        <Row gutter={12}>
          <Col xs={24} lg={12}>
            <Input
              id="ZipCode"
              label="Código Postal*"
              onChange={handleInputChange}
              validation={isZipCodeValid}
              value={struct.ZipCode}
            />
          </Col>

          <Col xs={24} lg={12}>
            <Select
              id="Colony"
              label="Colonia*"
              onChange={handleSelectChange}
              options={colonies}
              value={struct.Colony}
            />
          </Col>
        </Row>

        <br />
        
        <Row gutter={12}>
          <Col xs={24} lg={12}>
            <Input
              id="Street"
              label="Calle*"
              onChange={handleInputChange}
              validation={isNotNull}
              value={struct.Street}
            />
          </Col>

          <Col xs={24} lg={12}>
            <Input
              id="HabitantElectorKey"
              label="Clave de elector*"
              onChange={handleInputChange}
              validation={isHabitantElectorKeyValid}
              value={struct.HabitantElectorKey}
            />
          </Col>
        </Row>

        <br />

        <Row gutter={12}>
          <Col xs={24} lg={12}>
            <Input
              id="ExteriorNumber"
              label="Número exterior*"
              onChange={handleInputChange}
              type="number"
              validation={isNumberNotNull}
              value={struct.ExteriorNumber}
            />
          </Col>

          <Col xs={24} lg={12}>
            <Input
              id="InteriorNumber"
              label="Número interior"
              onChange={handleInputChange}
              type="number"
              value={struct.InteriorNumber}
            />
          </Col>
        </Row>

        <br />

        <label>¿Coincide INE con dirección de vivienda?</label>

        <Row>
          <Col lg={1}>
            <Checkbox
              checked={struct?.IneEqualsLivingPlace}
              data-testid="IneEqualsLivingPlace-checkbox"
              onClick={() => handleIneAddressCheckbox(true)}
            >
                Si
            </Checkbox>
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={!struct?.IneEqualsLivingPlace}
              data-testid="!IneEqualsLivingPlace-checkbox"
              onClick={() => handleIneAddressCheckbox(false)}
            >
              No
            </Checkbox>
          </Col>
        </Row>

        <br />

        {renderIneAddressField()}

        <br />

        <Row gutter={12}>
          <Col xs={24} lg={12}>
            <Input
              id="IntegrantsQuantity"
              label="¿Cuántos integrantes habitan tu domicilio?*"
              onChange={handleInputChange}
              type="number"
              value={struct.IntegrantsQuantity}
            />
          </Col>

          <Col xs={24} lg={12}>
            <label>¿Tiene acceso a internet en la vivienda?</label>
            <Row>
              <Col lg={2}>
                <Checkbox
                  checked={struct?.LivingPlaceHasInternet}
                  data-testid="LivingPlaceHasInternet-checkbox"
                  onClick={() => handleHasInternetCheckbox(true)}
                >
                    Si
                </Checkbox>
              </Col>
              <Col lg={2}>
                <Checkbox
                  checked={!struct?.LivingPlaceHasInternet}
                  data-testid="!LivingPlaceHasInternet-checkbox"
                  onClick={() => handleHasInternetCheckbox(false)}
                >
                  No
                </Checkbox>
              </Col>
            </Row>
          </Col>
        </Row>

        <br />

        <Row>
          <Col xs={24} lg={24}>
            <Input
              id="Name"
              label="Nombre*"
              onChange={handleInputChange}
              validation={isNotNull}
              value={struct.Name}
            />
          </Col>
        </Row>

        <br />

        <Row gutter={12}>
          <Col lg={12} xs={24}>
            <Input
              id="Surname"
              label="Apellido Paterno*"
              onChange={handleInputChange}
              validation={isNotNull}
              value={struct.Surname}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Input
              id="SecondSurname"
              label="Apellido Materno*"
              onChange={handleInputChange}
              validation={isNotNull}
              value={struct.SecondSurname}
            />
          </Col>
        </Row>

        <br />

        <Row>
          <label>Foto</label>
          <Col lg={24}>
            <Upload>
              <Button icon={<FileImageOutlined />}>Haz click aqui para subir foto</Button>
            </Upload>
          </Col>
        </Row>

        <br />

        <Row>
          <Col xs={24} lg={24}>
            <Input
              allMayus
              id="Curp"
              label="CURP*"
              onChange={handleInputChange}
              validation={isCurpValid}
              value={struct.Curp}
            />
          </Col>
        </Row>

      <br />

      <label>Fecha de nacimiento*</label>
      <Row gutter={12}>
        <Col lg={2}>
          <Input
            id="Day"
            label="Dia"
            maxLength={2}
            onChange={handleDateChange}
            type="number"
            validation={isDayValid}
            value={birthDate.day}
          />
        </Col>
      </Row>
    </Card>
    </div>
  );
}

export default StructPoll;
