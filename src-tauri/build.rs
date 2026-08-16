fn main() {
    // App commands are blocked by the ACL by default in Tauri 2.11+; listing
    // them here auto-generates the `allow-*`/`deny-*` permissions so the
    // packaged app can actually invoke them (hardware, weather, AI hub…).
    tauri_build::try_build(
        tauri_build::Attributes::new().app_manifest(
            tauri_build::AppManifest::new().commands(&[
                "get_system_info",
                "fetch_ical",
                "open_url",
                "bilibili_search",
                "geocode_city",
                "reverse_geocode",
                "fetch_weather_forecast",
                "toggle_main_window",
                "set_autostart",
                "register_global_hotkey",
                "send_notification",
                "start_sensor_service",
                "check_for_updates",
                "install_update",
                "dismiss_pending_update",
                "restart_app",
                "toggle_immersive_fullscreen",
                "is_immersive_fullscreen",
                "open_ai_hub",
                "create_or_update_ai_webview",
                "take_ai_hub_pending_tab",
            ]),
        ),
    )
    .expect("tauri-build failed")
}
