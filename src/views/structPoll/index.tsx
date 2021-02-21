import * as React from 'react';
import {
  Card,
  Row,
  Col,
  Checkbox,
} from 'antd';
import Input, { InputChangeEvent } from '../../components/Input';
import { useStruct } from '../../hooks/struct';
import { isCellphoneValid } from '../../utils/validations';

function StructPoll() {
  const { struct, setStruct } = useStruct();

  function handleInputChange(data: InputChangeEvent) {

  }

  function handleCheckbox(data: boolean) {
    setStruct({
      IsVinculated: data,
    });
  }

  function renderStructInfoField(): React.ReactNode | null {
    if (struct?.IsVinculated) {
      return (
        <Row>
          <Col lg={24}>
            <Input
              allowEmpty
              id="LeaderElectorKey"
              onChange={handleInputChange}
              validation={isCellphoneValid}
              value={struct.LeaderElectorKey}
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
        title="Nueva estructura"
      >
        <label>¿Está vinculado?</label>

        <Row>
          <Col lg={1}>
            <Checkbox
              checked={struct?.IsVinculated}
              data-testid="IsVinculated-checkbox"
              onClick={() => handleCheckbox(true)}
            >
                Si
            </Checkbox>
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={!struct?.IsVinculated}
              data-testid="IsNotVinculated-checkbox"
              onClick={() => handleCheckbox(false)}
            >
              No
            </Checkbox>
          </Col>
        </Row>

        <br />

        {renderStructInfoField()}
      </Card>
    </div>
  );
}

export default StructPoll;
