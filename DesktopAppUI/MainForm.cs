
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ViewModels;

namespace DesktopAppUI
{
    public partial class MainForm : Form
    {
        static SerialPort _serialPort;
        public int Velocity { get; set; }
        HubConnection _connection { get; set; }
        public MainForm()
        {
            InitializeComponent();
            _serialPort = new SerialPort();
            _serialPort.PortName = "COM5";//Set your board COM
            _serialPort.BaudRate = 19200;
            _serialPort.Open();
            Velocity = 50;

            _connection = null;
        }

        private async void buttonStart_Click(object sender, EventArgs e)
        {

            var hubConnection = new HubConnectionBuilder()
            .WithUrl("https://localhost:44358/centralHub")
            .Build();

            //var hubConnection = new HubConnectionBuilder()
            //.WithUrl("https://robocam2.brodev.info/centralHub")
            //.Build();

            _connection = hubConnection;

            hubConnection.On<string, string>("ReceiveCommand", (message, value) =>
            {
                //s - stop
                //f - forward
                //l - left
                //r - right
                //b - backward
                switch(message)
                {
                    case "stop":
                        clearButtons();
                        _serialPort.Write("s");
                        break;
                    case "up":
                        buttonUp.BackColor = Color.DeepSkyBlue;
                        _serialPort.Write("f");
                        break;
                    case "left":
                        buttonLeft.BackColor = Color.DeepSkyBlue;
                        _serialPort.Write("l");
                        break;
                    case "right":
                        buttonRight.BackColor = Color.DeepSkyBlue;
                        _serialPort.Write("r");
                        break;
                    case "down":
                        buttonDown.BackColor = Color.DeepSkyBlue;
                        _serialPort.Write("b");
                        break;
                    case "aOn":
                        checkBoxAnalogue.Checked = true;
                        labelVelocity.Visible = true;
                        labelVelocityValue.Visible = true;
                        _serialPort.Write("a");
                        break;
                    case "aOff":
                        checkBoxAnalogue.Checked = false;
                        labelVelocity.Visible = false;
                        labelVelocityValue.Visible = false;
                        _serialPort.Write("d");
                        break;
                    case "v":
                        labelVelocityValue.Text = value;
                        var speed = int.Parse(value);
                        if(speed > 0 && speed <= 33)
                        {
                            _serialPort.Write("1");
                        }
                        if (speed > 33 && speed <= 66)
                        {
                            _serialPort.Write("2");
                        }
                        if (speed > 66 && speed <= 100)
                        {
                            _serialPort.Write("3");
                        }
                        break;
                    default:
                        break;
                }
            });

            await hubConnection.StartAsync();
            MessageBox.Show("Listening");
        }

        private void clearButtons()
        {
            buttonLeft.BackColor = default;
            buttonUp.BackColor = default;
            buttonRight.BackColor = default;
            buttonDown.BackColor = default;
        }

        private async void serialPort_CheckDataReceived()
        {
            string s = _serialPort.ReadExisting();
            if(s != null)
            {
                _serialPort.DiscardOutBuffer();
                _serialPort.DiscardInBuffer();

            }
            await _connection.InvokeAsync("SendSensorData", new SensorDataVM
            {
                Temperature = 30,
                Humidity = 50,
                GasLevel = "Moderate"
            });
        }

        private void buttonCheck_Click(object sender, EventArgs e)
        {
            serialPort_CheckDataReceived();
        }
    }
}
